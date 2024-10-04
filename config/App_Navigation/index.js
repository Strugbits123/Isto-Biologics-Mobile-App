// import { StyleSheet, Text, View } from "react-native";
// import React, { useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Bottom_Navigation from "./Bottom_Navigation";
// import SplashScreen from "../../screens/splash/SplashScreen";
// import LoginScreen from "../../screens/login/LoginScreen";
// import HomeScreen from "../../screens/home/HomeScreen";
// import DocsScreen from "../../screens/docs/DocsScreen";
// import ProfileScreen from "../../screens/profile/ProfileScreen";
// import { useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const Stack = createNativeStackNavigator();

// const App_Navigation = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = AsyncStorage.getItem("token");
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         {isLoggedIn ? (
//           <Stack.Screen
//             name="Bottom_Navigation"
//             component={Bottom_Navigation}
//           />
//         ) : (
//           <Stack.Screen name="login" component={LoginScreen} />
//         )}

//         <Stack.Screen name="splash" component={SplashScreen} />
//         <Stack.Screen name="profile" component={ProfileScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App_Navigation;

// const styles = StyleSheet.create({});

import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Bottom_Navigation from "./Bottom_Navigation";
import SplashScreen from "../../screens/splash/SplashScreen";
import LoginScreen from "../../screens/login/LoginScreen";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import { LoadingIndicator } from "../../components/LoadingIndicator/LoadingIndicator";

const Stack = createNativeStackNavigator();

const App_Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null to handle splash state

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setIsLoggedIn(!!token); // Convert token to a boolean value
      } catch (e) {
        console.error("Error reading token:", e);
      }
    };

    checkToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Bottom_Navigation" component={Bottom_Navigation} />
        <Stack.Screen name="login" component={LoginScreen} />
        {/* Keep other screens outside of the login check */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App_Navigation;

const styles = StyleSheet.create({});
