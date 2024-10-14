// import {
//   exchangeCodeAsync,
//   makeRedirectUri,
//   useAuthRequest,
// } from "expo-auth-session";
// import * as Linking from "expo-linking";
// import * as React from "react";
// import "react-native-gesture-handler";
// import "react-native-url-polyfill/auto";
// import { WebView } from "react-native-webview";
// import validator from "validator";
// import { useWixSession } from "./session";
// import { createClient, OAuthStrategy } from "@wix/sdk";
// import { LoginHandlerInvisibleWebview } from "../components/LoginHandlerInvisibleWebview";

// const LoginHandlerContext = React.createContext(null);

// export function useLoginHandler() {
//   return React.useContext(LoginHandlerContext);
// }

// export function LoginHandler(props) {
//   const { session, setSessionLoading } = useWixSession();
//   const [loginState, setLoginState] = React.useState(null);

//   const myWixClient = createClient({
//     auth: OAuthStrategy({
//       clientId: "0715f53d-fb36-46bd-8fce-7f151bf279ee",
//     }),
//   });
//   const login = React.useCallback(
//     async (email, password) => {
//       const result = await myWixClient.auth.login({
//         email,
//         password,
//       });
//       const data = myWixClient.auth.generateOAuthData(
//         Linking.createURL("exp://172.16.0.181:8081/oauth/wix/callback"),
//       );
//       const { authUrl } = await myWixClient.auth.getAuthUrl(data, {
//         prompt: "none",
//         sessionToken: result.data.sessionToken,
//       });
//       setLoginState({
//         url: authUrl,
//         data,
//       });
//     },
//     [myWixClient.auth, setSessionLoading],
//   );

//   return (
//     <LoginHandlerContext.Provider value={{ login }}>
//       <LoginHandlerInvisibleWebview
//         loginState={loginState}
//         setLoginState={setLoginState}
//       />
//       {props.children}
//     </LoginHandlerContext.Provider>
//   );
// }

import * as Linking from "expo-linking";
import * as React from "react";
import { useWixSession } from "./session";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { LoginHandlerInvisibleWebview } from "../components/LoginHandlerInvisibleWebview";

const LoginHandlerContext = React.createContext(null);

export function useLoginHandler() {
  return React.useContext(LoginHandlerContext);
}

export function LoginHandler(props) {
  //   const { setSessionLoading } = useWixSession();
  const [loginState, setLoginState] = React.useState(null);

  const myWixClient = createClient({
    auth: OAuthStrategy({
      clientId: "0715f53d-fb36-46bd-8fce-7f151bf279ee",
    }),
  });
  console.log("run")

  const login = React.useCallback(
    async (email, password) => {
      console.log("function run");
      const result = await myWixClient.auth.login({
        email,
        password,
      });
      console.log("results", result);
      const data = myWixClient.auth.generateOAuthData(
        Linking.createURL("exp://172.16.0.181:8081/oauth/wix/callback"),
      );
      console.log("data", data);
      const { authUrl } = await myWixClient.auth.getAuthUrl(data, {
        prompt: "none",
        sessionToken: result.data.sessionToken,
      });
      console.log("authUrl", authUrl);
      setLoginState({
        url: authUrl,
        data,
      });
    },
    [myWixClient.auth],
  );

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
