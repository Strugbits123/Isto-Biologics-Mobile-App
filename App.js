import "./polyfills";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { Text, View } from "react-native";
import "react-native-gesture-handler";
import "react-native-url-polyfill/auto";
import { WixSessionProvider } from "./authentication/session";
import { LoginHandler } from "./authentication/LoginHandler";
import App_Navigation from "./config/App_Navigation";
import { PointsProvider } from "./components/PointsHandler";
import { CurrentMemberProvider } from "./components/CurrentMemberHandler";
import * as SplashScreen from "expo-splash-screen";
import {
  PlusJakartaSans_700Bold,
  useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";

// Prevent auto-hiding of the splash screen
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

function App() {
  const [fontsLoaded, fontsError] = useFonts({ PlusJakartaSans_700Bold });

  React.useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WixSessionProvider clientId="0715f53d-fb36-46bd-8fce-7f151bf279ee">
          <LoginHandler>
            <CurrentMemberProvider>
              <PointsProvider>
                {/* <App_Navigation /> */}
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 18,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >
                    Hello Janisar
                  </Text>
                </View>
              </PointsProvider>
            </CurrentMemberProvider>
          </LoginHandler>
        </WixSessionProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
