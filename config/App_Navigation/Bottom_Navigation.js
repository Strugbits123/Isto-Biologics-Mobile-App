import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/home/HomeScreen";
import DocsScreen from "../../screens/docs/DocsScreen";
import { UnActiveHomeTabIcon, HomeTabIcon } from "../../Icons/HomeTabIcon";
import LeaderboardTabIcon from "../../Icons/LeaderboardTabIcon";
import { UnActiveDocsTabIcon, DocsTabIcon } from "../../Icons/DocsTabIcon";
import Leaderboard from "../../screens/leaderboard/Leaderboard";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import Entries from "../../screens/Entries/Entries";
import DetailedEntry from "../../screens/DetailedEntry/DetailedEntry";
import AddData from "../../screens/addData/AddData";
import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Adjusts dimensions based on iPhone 14 Plus width
const scaleSize = (size) => {
  const scale = SCREEN_WIDTH / 430;
  return PixelRatio.roundToNearestPixel(size * scale);
};

const Tab = createBottomTabNavigator();

const Bottom_Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FCC34A",
        headerShown: false,
        tabBarStyle: {
          height: scaleSize(80), // Set tab bar height to 80px
          paddingHorizontal: scaleSize(40),
          elevation: 0, // Removes shadow on Android
          shadowOpacity: 0, // Removes shadow on iOS
          borderTopWidth: 0, // Removes the border
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <HomeTabIcon width={scaleSize(24)} height={scaleSize(22)} />
            ) : (
              <UnActiveHomeTabIcon
                width={scaleSize(24)}
                height={scaleSize(22)}
              />
            ),
          tabBarLabel: () => null,
        }}
        name="home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={{ paddingBottom: scaleSize(59) }}>
              {/* Adjust the padding value as needed */}
              <LeaderboardTabIcon
                width={scaleSize(186)}
                height={scaleSize(90)}
              />
            </View>
          ),

          tabBarLabel: () => null,
        }}
        name="leaderboard"
        component={Leaderboard}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <UnActiveDocsTabIcon
                width={scaleSize(20)}
                height={scaleSize(23)}
              />
            ) : (
              <DocsTabIcon width={scaleSize(18)} height={scaleSize(21)} />
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
