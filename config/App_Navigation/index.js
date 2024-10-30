import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Bottom_Navigation from "./Bottom_Navigation";
import LoginScreen from "../../screens/login/LoginScreen";
import CMLoader from "../../components/CMLoader";
import { useWixSession } from "../../authentication/session";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from 'expo-status-bar';
const Stack = createNativeStackNavigator();

const App_Navigation = () => {
  const { session } = useWixSession();
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null to handle splash state
  const [isLoading, setIsLoading] = useState(true); // null to handle splash state

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
  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CMLoader size={50} />
    </View>
  ) : (
    <NavigationContainer>
      <StatusBar style="auto" />
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
