import WebView from "expo-web-view";
import { useWixSession } from "../authentication/session";

export function LoginHandlerInvisibleWebview({
  loginState,
  setloginState,
}) {
  const { setSession } = useWixSession();

  console.log("check login state", loginState)

  //Wix headless create client method for auth clientId
  const myWixClient = createClient({
    auth: OAuthStrategy({
      clientId: "0715f53d-fb36-46bd-8fce-7f151bf279ee",
    }),
  });

  if (!loginState) {
    return null;
  } else {
    return (
      <WebView
        source={{ uri: loginState.url }}
        originWhitelist={["exp://*", "wixmobileheadless://*"]}
        containerStyle={{ display: "none" }}
        onShouldStartLoadWithRequest={(request) => {
          if (
            request.url.startsWith(
              Linking.createURL("exp://172.16.0.181:8081/oauth/wix/callback"),
            )
          ) {
            const { code, state } = myWixClient.auth.parseFromUrl(
              request.url,
              loginState.data,
            );
            myWixClient.auth
              .getMemberTokens(code, state, loginState.data)
              .then((tokens) => {
                setSession(tokens);
                setloginState(null);
              });
            return false;
          }
          return true;
        }}
      />
    );
  }
}
