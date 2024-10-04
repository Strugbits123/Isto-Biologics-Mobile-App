import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/home/HomeScreen";
import LoginScreen from "../../screens/login/LoginScreen";
import DocsScreen from "../../screens/docs/DocsScreen";
import HomeTabIcon from "../../Icons/HomeTabIcon";
import LeaderboardTabIcon from "../../Icons/LeaderboardTabIcon";
import DocsTabIcon from "../../Icons/DocsTabIcon";
import Leaderboard from "../../screens/leaderboard/Leaderboard";
import { ThemeBgColors } from "../../theme/theme";
import ProfileScreen from "../../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

const Bottom_Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FCC34A",
        headerShown: false,
        tabBarStyle: {
          height: 80, // Set tab bar height to 80px
          paddingHorizontal: 40,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeTabIcon width={24} height={22} />
          ),
          tabBarLabel: () => null,
        }}
        name="home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={{ paddingBottom: 57 }}>
              {/* Adjust the padding value as needed */}
              <LeaderboardTabIcon width={186} height={90} />
            </View>
          ),

          tabBarLabel: () => null,
        }}
        name="leaderboard"
        component={Leaderboard}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <DocsTabIcon width={18} height={21} />
          ),
          tabBarLabel: () => null,
        }}
        name="docs"
        component={DocsScreen}
      />
       <Tab.Screen
        options={{
            tabBarButton: () => null, // Hide this tab from the tab bar
        }}
        name="profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default Bottom_Navigation;

// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeScreen from "../../screens/home/HomeScreen";
// import LoginScreen from "../../screens/login/LoginScreen";
// import DocsScreen from "../../screens/docs/DocsScreen";
// import HomeTabIcon from "../../Icons/HomeTabIcon";
// import LeaderboardTabIcon from "../../Icons/LeaderboardTabIcon";
// import CustomTabBarBackground from "../../Icons/CustomTabBarBackground";
// import DocsTabIcon from "../../Icons/DocsTabIcon";

// const Tab = createBottomTabNavigator();

// const Bottom_Navigation = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarActiveTintColor: "#FCC34A",
//         headerShown: false,
//         tabBarStyle: {
//           height: 90, // Set tab bar height to 80px
//         //   position: 'absolute',
//         //   bottom: 0,
//         //   left: 0,
//         //   right: 0,
//         //   borderTopWidth: 0,
//         //   elevation: 0,
//         //   backgroundColor: 'transparent', // Make it transparent to show custom background
//         },
//       }}
//       // tabBar={() => <CustomTabBarBackground width={428} height={87} />}
//     >
//       <Tab.Screen
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <HomeTabIcon width={24} height={22} />
//           ),
//           tabBarLabel: () => null,
//         }}
//         name="home"
//         component={HomeScreen}
//       />
//       <Tab.Screen
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <View style={{ paddingBottom: 60 }}>
//               {/* Adjust the padding value as needed */}
//               <LeaderboardTabIcon width={70} height={70} />
//             </View>
//           ),
//           tabBarLabel: () => null,
//         }}
//         name="login"
//         component={LoginScreen}
//       />
//       <Tab.Screen
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <DocsTabIcon width={18} height={21} />
//           ),
//           tabBarLabel: () => null,
//         }}
//         name="docs"
//         component={DocsScreen}
//       />
//     </Tab.Navigator>
//   );
// };

// export default Bottom_Navigation;
