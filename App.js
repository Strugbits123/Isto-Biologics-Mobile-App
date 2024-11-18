import "./polyfills";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { Button, Text, View } from "react-native";
import "react-native-gesture-handler";
import "react-native-url-polyfill/auto";
import { WixSessionProvider } from "./authentication/session";
import { LoginHandler } from "./authentication/LoginHandler";
import App_Navigation from "./config/App_Navigation";
import { PointsProvider } from "./components/PointsHandler";
import { CurrentMemberProvider } from "./components/CurrentMemberHandler";
import * as Sentry from "@sentry/react-native";

// Prevent auto-hiding of the splash screen
const queryClient = new QueryClient();

Sentry.init({
  dsn: "https://9d5a82e06f407b4c06fb6044e15c8a28@o4508303211560960.ingest.us.sentry.io/4508303213002752",
  tracesSampleRate: 1.0,
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WixSessionProvider clientId="0715f53d-fb36-46bd-8fce-7f151bf279ee">
          <LoginHandler>
            <CurrentMemberProvider>
              <PointsProvider>
                <App_Navigation />
              </PointsProvider>
            </CurrentMemberProvider>
          </LoginHandler>
        </WixSessionProvider>
      </QueryClientProvider>
    </>
  );
}

// export default App;
export default Sentry.wrap(App);
