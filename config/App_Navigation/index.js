import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as Sentry from "@sentry/react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Bottom_Navigation from "./Bottom_Navigation";
import LoginScreen from "../../screens/login/LoginScreen";
import CMLoader from "../../components/CMLoader";
import { useWixSession } from "../../authentication/session";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import {
  PlusJakartaSans_700Bold,
  useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";


// Prevent auto-hiding of the splash screen
SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

// const navigationIntegration = Sentry.reactNativeInfoIntegration({
//   enableTimeToInitialDisplay: true, // default: false
//   routeChangeTimeoutMs: 1_000, // default: 1_000
//   ignoreEmptyBackNavigationTransactions: true, // default: true
// });

// Sentry.init({
//   dsn: "https://9d5a82e06f407b4c06fb6044e15c8a28@o4508303211560960.ingest.us.sentry.io/4508303213002752",
//   integrations: [navigationIntegration],
// });

const App_Navigation = () => {
  const { session } = useWixSession();
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null to handle splash state
  const [isLoading, setIsLoading] = useState(true); // null to handle splash state
  const [fontsLoaded, fontsError] = useFonts({ PlusJakartaSans_700Bold });

  const containerRef = React.useRef();

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  //check auth route
  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const savedSession = await SecureStore.getItemAsync("wixSession");
        if (savedSession) {
          const { tokens } = JSON.parse(savedSession);
          if (tokens?.refreshToken?.role === "member") {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error("Error fetching auth token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthToken();
  }, []);


  if (!fontsLoaded && !fontsError) {
    return null; // Show nothing until fonts are loaded
  }

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CMLoader size={50} />
    </View>
  ) : (
    <NavigationContainer
      // ref={containerRef}
      // onReady={() => {
      //   navigationIntegration.registerNavigationContainer(containerRef);
      // }}
      >
      {/* <StatusBar style="auto" /> */}
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      {isLoggedIn ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Bottom_Navigation"
            component={Bottom_Navigation}
          />
          <Stack.Screen name="login" component={LoginScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen
            name="Bottom_Navigation"
            component={Bottom_Navigation}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer >
  );
};

export default App_Navigation;

const styles = StyleSheet.create({});
