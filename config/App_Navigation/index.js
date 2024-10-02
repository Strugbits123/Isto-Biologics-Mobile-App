import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Bottom_Navigation from "./Bottom_Navigation";
import SplashScreen from "../../screens/splash/SplashScreen";
import LoginScreen from "../../screens/login/LoginScreen";
import HomeScreen from "../../screens/home/HomeScreen";
import DocsScreen from "../../screens/docs/DocsScreen";

const Stack = createNativeStackNavigator();

const App_Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Bottom_Navigation" component={Bottom_Navigation} />
        <Stack.Screen name="docs" component={DocsScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="splash" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App_Navigation;

const styles = StyleSheet.create({});
