import "./polyfills";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import "react-native-gesture-handler";
import "react-native-url-polyfill/auto";
import { WixSessionProvider } from "./authentication/session";
import { LoginHandler } from "./authentication/LoginHandler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { LoadingIndicator } from "./components/LoadingIndicator/LoadingIndicator";
import App_Navigation from "./config/App_Navigation";

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

function App() {
  const [fontsLoaded] = useFonts({
    "Fraunces-Regular": require("./assets/fonts/static/Fraunces_144pt-Regular.ttf"),
    "Fraunces-Bold": require("./assets/fonts/static/Fraunces_144pt-Bold.ttf"),
    "Jakarta-Sans": require("./assets/fonts/static/PlusJakartaSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }

  // const clientId = process.env.WIX_CLIENT_ID || "";

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WixSessionProvider clientId="0715f53d-fb36-46bd-8fce-7f151bf279ee">
          <LoginHandler>
            <App_Navigation />
          </LoginHandler>
        </WixSessionProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
