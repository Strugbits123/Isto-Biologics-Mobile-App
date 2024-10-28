import * as Linking from "expo-linking";
import * as React from "react";
import { useWixSession } from "./session";
import validator from "validator";
import WebView from "react-native-webview";
import { myWixClient } from "../utils/createClient";

const LoginHandlerContext = React.createContext(null);

export function useLoginHandler() {
  return React.useContext(LoginHandlerContext);
}

export function LoginHandler(props) {
  const { session, setSessionLoading } = useWixSession();
  const [loginState, setLoginState] = React.useState(null);
  const [rememberMe, setRememberMe] = React.useState(false)

  const silentLogin = React.useCallback(
    async (sessionToken) => {
      const data = myWixClient.auth.generateOAuthData(
        Linking.createURL("/oauth/wix/callback"),
      );
      // console.log("data", data)
      const { authUrl } = await myWixClient.auth.getAuthUrl(data, {
        prompt: "none",
        sessionToken,
      });
      // console.log("authUrl", authUrl)
      const result = await fetch(authUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("result", result)
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
    async (email, password, rememberMe) => {
      // console.log("rememberMe", rememberMe);
      setRememberMe(rememberMe);
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
        rememberMe={rememberMe}
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
            myWixClient.auth
              .getMemberTokens(code, state, props.loginState.data)
              .then((tokens) => {
                // console.log("props.rememberMe", props.rememberMe);
                setSession(tokens, props.rememberMe);
                props.setLoginState(null);
              });
            return false;
          }
          return true;
        }}
      />
    );
  }
}
