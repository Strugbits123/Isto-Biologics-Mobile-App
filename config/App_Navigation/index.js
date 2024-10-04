import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Bottom_Navigation from "./Bottom_Navigation";
import SplashScreen from "../../screens/splash/SplashScreen";
import LoginScreen from "../../screens/login/LoginScreen";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import { LoadingIndicator } from "../../components/LoadingIndicator/LoadingIndicator";
import CMLoader from "../../components/CMLoader";
import { token } from "../../utils/constants";

const Stack = createNativeStackNavigator();

const App_Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null to handle splash state
  const [isLoading, setIsLoading] = useState(true); // null to handle splash state

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        console.log("Fetching auth token...");
        const auth_token = await AsyncStorage.getItem(token);
        console.log("Auth token:", auth_token);

        if (auth_token) {
          console.log("Auth token found, verifying...");
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          console.log("No auth token found, setting auth to false");
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

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CMLoader size={50} />
    </View>
  ) : (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default App_Navigation;

const styles = StyleSheet.create({});
