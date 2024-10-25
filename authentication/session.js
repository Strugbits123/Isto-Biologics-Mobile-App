import { createClient, OAuthStrategy } from "@wix/sdk";
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { View } from "react-native";
import "react-native-gesture-handler";
import "react-native-url-polyfill/auto";
import { myWixClient } from "../utils/createClient";
import CMLoader from "../components/CMLoader";
import { useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
/**
 * @type {React.Context<{
 *  session: import("@wix/sdk").Tokens,
 * setSession: (session: import("@wix/sdk").Tokens) => Promise<void>,
 * newVisitorSession: () => Promise<void> }>}
 */
const WixSessionContext = React.createContext(undefined);

export function WixSessionProvider(props) {
  const [session, setSessionState] = React.useState(null);
  const [sessionLoading, setSessionLoading] = React.useState(false);
  const [rememberMeChecked, setRememberMeChecked] = React.useState(false);
  const queryClient = useQueryClient();

  const setSession = React.useCallback(
    async (tokens, rememberMe) => {
      myWixClient.auth.setTokens(tokens);
      // Store session securely if remember me is checked
      if (rememberMe) {
        await SecureStore.setItemAsync(
          "wixSession",
          JSON.stringify({ tokens, clientId: props.clientId }),
        );
      }
      setSessionState(tokens);
      setSessionLoading(false);
    },
    [myWixClient.auth, setSessionState],
  );

  const newVisitorSession = React.useCallback(async () => {
    setSessionState(null);
    setSessionLoading(true);
    const tokens = await myWixClient.auth.generateVisitorTokens();
    setSession(tokens);
  }, [myWixClient.auth, setSessionState]);

  React.useEffect(() => {
    setSessionLoading(true);
    SecureStore.getItemAsync("wixSession").then((wixSession) => {
      console.log("wixSession on firstTime", wixSession);
      if (!wixSession) {
        newVisitorSession();
        // console.log("wixSession not found");
      } else {
        const { tokens, clientId } = JSON.parse(wixSession);
        console.log("tokens in useEffect",tokens)
        if (clientId !== props.clientId) {
          newVisitorSession();
          // console.log("wixSession not found");
        } else {
          setSession(tokens);
        }
      }
    });
  }, []);

  if (!session) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <CMLoader size={50} />
      </View>
    );
  }

  return (
    <WixSessionContext.Provider
      value={{
        session,
        setSession,
        sessionLoading,
        setSessionLoading,
        newVisitorSession,
      }}
    >
      {props.children}
    </WixSessionContext.Provider>
  );
}

export function useWixSession() {
  const context = React.useContext(WixSessionContext);
  if (context === undefined) {
    throw new Error("useWixSession must be used within a WixSessionProvider");
  }
  return context;
}
