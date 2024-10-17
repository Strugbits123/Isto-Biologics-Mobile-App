// import WebView from "expo-web-view";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
import { useWixSession } from "../authentication/session";
import { createClient, OAuthStrategy } from "@wix/sdk";

export function LoginHandlerInvisibleWebview(props) {
  const { setSession } = useWixSession();

  console.log("props in LoginHandlerInvisibleWebview", props);

  //Wix headless create client method for auth clientId
  const myWixClient = createClient({
    auth: OAuthStrategy({
      clientId: "0715f53d-fb36-46bd-8fce-7f151bf279ee",
    }),
  });

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
            console.log("code", code);
            console.log("state", state);
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
