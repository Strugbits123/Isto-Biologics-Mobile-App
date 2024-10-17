import * as Linking from "expo-linking";
import * as React from "react";
import { useWixSession } from "./session";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { members } from "@wix/members";
import validator from "validator";
import WebView from "react-native-webview";

const myWixClient = createClient({
  modules: {
    members,
  },
  auth: OAuthStrategy({
    clientId: "0715f53d-fb36-46bd-8fce-7f151bf279ee",
  }),
});
const LoginHandlerContext = React.createContext(null);

export function useLoginHandler() {
  return React.useContext(LoginHandlerContext);
}

// export function LoginHandler(props) {
//   const { setSessionLoading } = useWixSession();
//   const [loginState, setLoginState] = React.useState({});
//   const login = React.useCallback(
//     async (email, password) => {
//       const result = await myWixClient.auth.login({
//         email,
//         password,
//       });
//       // console.log("results", result);
//       const data = myWixClient.auth.generateOAuthData(
//         Linking.createURL("/oauth/wix/callback"),
//       );
//       // console.log("data", data);
//       const { authUrl } = await myWixClient.auth.getAuthUrl(data, {
//         prompt: "none",
//         sessionToken: result.data.sessionToken,
//       });
//       // console.log("authUrl", authUrl);
//       setLoginState({
//         url: authUrl,
//         data,
//       });
//     },
//     [myWixClient.auth, setSessionLoading],
//   );

export function LoginHandler(props) {
  const { session, setSessionLoading } = useWixSession();
  const [loginState, setLoginState] = React.useState(null);

  const silentLogin = React.useCallback(
    async (sessionToken) => {
      const data = myWixClient.auth.generateOAuthData(
        Linking.createURL("/oauth/wix/callback"),
      );
      const { authUrl } = await myWixClient.auth.getAuthUrl(data, {
        prompt: "none",
        sessionToken,
      });
      const result = await fetch(authUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result.status === 400) {
        setSessionLoading(false);
        return Promise.reject(
          "Invalid redirect URI. Please add an allowed URI to your Oauth App",
        );
      }

      setLoginState({
        url: authUrl,
        data,
      });
    },
    [myWixClient.auth, setSessionLoading],
  );

  const login = React.useCallback(
    async (email, password) => {
      setSessionLoading(true);
      if (!validator.isEmail(email)) {
        setSessionLoading(false);
        return Promise.reject("Invalid email address!");
      }
      const result = await myWixClient.auth.login({
        email,
        password,
      });
      if (!result?.data?.sessionToken) {
        setSessionLoading(false);
        if (result?.loginState === "FAILURE") {
          return Promise.reject("Email address or password is incorrect!");
        }
        return Promise.reject("An error occurred!");
      }
      await silentLogin(result.data.sessionToken);
    },
    [myWixClient.auth, setSessionLoading],
  );

  React.useEffect(() => {
    const subscription = Linking.addEventListener("url", async (event) => {
      const url = new URL(event.url);
      const wixMemberLoggedIn = url.searchParams.get("wixMemberLoggedIn");
      console.log("wixMemberLoggedIn", wixMemberLoggedIn);
      const requiresSilentLogin =
        wixMemberLoggedIn === "true" && session.refreshToken.role !== "member";
      if (requiresSilentLogin) {
        silentLogin();
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <LoginHandlerContext.Provider value={{ login }}>
      <LoginHandlerInvisibleWebview
        loginState={loginState}
        setLoginState={setLoginState}
      />
      {props.children}
    </LoginHandlerContext.Provider>
  );
}

function LoginHandlerInvisibleWebview(props) {
  const { setSession } = useWixSession();

  if (!props.loginState) {
    return null;
  } else {
    return (
      <WebView
        source={{ uri: props.loginState.url }}
        originWhitelist={["exp://*", "wixmobileheadless://*"]}
        containerStyle={{ display: "none" }}
        onShouldStartLoadWithRequest={(request) => {
          if (
            request.url.startsWith(Linking.createURL("/oauth/wix/callback"))
          ) {
            const { code, state } = myWixClient.auth.parseFromUrl(
              request.url,
              props.loginState.data,
            );
            // console.log("code", code);
            // console.log("state", state);
            myWixClient.auth
              .getMemberTokens(code, state, props.loginState.data)
              .then((tokens) => {
                // console.log("tokens in LoginHandlerInvisibleWebview",tokens);
                setSession(tokens);
                props.setloginState(null);
              });
            return false;
          }
          return true;
        }}
      />
    );
  }
}
