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
import Entries from "../../screens/Entries/Entries";
import DetailedEntry from "../../screens/DetailedEntry/DetailedEntry";
import AddData from "../../screens/addData/AddData";

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
        tabBarHideOnKeyboard:true
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
       <Tab.Screen
        options={{
            tabBarButton: () => null, // Hide this tab from the tab bar
        }}
        name="add_data"
        component={AddData}
      />
       <Tab.Screen
        options={{
            tabBarButton: () => null, // Hide this tab from the tab bar
        }}
        name="entries"
        component={Entries}
      />
       <Tab.Screen
        options={{
            tabBarButton: () => null, // Hide this tab from the tab bar
        }}
        name="detailed_entry"
        component={DetailedEntry}
      />
    </Tab.Navigator>
     
  );
};

export default Bottom_Navigation;
