import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHeader from "../../components/CMHeader/CMHeader";
import CMHomeCard from "../../components/CMHomeCard";
import { useFonts } from "expo-font";
import { LoadingIndicator } from "../../components/LoadingIndicator/LoadingIndicator";
import CMModal from "../../components/CMModal";
import CMLoader from "../../components/CMLoader";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { members } from "@wix/members";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { token } from "../../utils/constants";

const HomeScreen = () => {
  // //Wix headless create client method for auth clientId
  const myWixClient = createClient({
    auth: OAuthStrategy({
      clientId: "0715f53d-fb36-46bd-8fce-7f151bf279ee",
      tokens: {
        accessToken: {
          expiresAt: 1728667830,
          value:
            "OauthNG.JWS.eyJraWQiOiJZSEJzdUpwSCIsImFsZyI6IkhTMjU2In0.eyJkYXRhIjoie1wiaW5zdGFuY2VcIjp7XCJpbnN0YW5jZUlkXCI6XCI5N2QzOGU0Yy1hMzk0LTRkNzgtOGZhZS1kMTlhZmJiZjk3NjZcIixcImFwcERlZklkXCI6XCIwNzE1ZjUzZC1mYjM2LTQ2YmQtOGZjZS03ZjE1MWJmMjc5ZWVcIixcInNpZ25EYXRlXCI6XCIyMDI0LTEwLTExVDEzOjMwOjM0Ljc2MFpcIixcInBlcm1pc3Npb25zXCI6XCJcIixcImRlbW9Nb2RlXCI6ZmFsc2UsXCJzaXRlT3duZXJJZFwiOlwiN2EwY2Q2ODEtN2M2Yy00ZGU4LWExMmUtMWZjY2Q5ZTk1ZWE5XCIsXCJhaWRcIjpcIjFiOWQyMTBjLWQxZGMtNDYxZS04MmZkLTE3ZjFlOWNjNmE4Y1wiLFwibWV0YVNpdGVJZFwiOlwiZTE5NzVjZDAtN2U3Ny00OGRmLThiMzYtNDUyMGZiODkyMzQ3XCIsXCJleHBpcmF0aW9uRGF0ZVwiOlwiMjAyNC0xMC0xMVQxNzozMDozNC43NjBaXCJ9fSIsImlhdCI6MTcyODY1MzQzNCwiZXhwIjoxNzI4NjY3ODM0fQ.h1uVcp26l_1GVBGabUgS2BGzz4uTLnu7H2hoZuj1fDk",
        },
        refreshToken: {
          value:
            "JWS.eyJraWQiOiJZSEJzdUpwSCIsImFsZyI6IkhTMjU2In0.eyJkYXRhIjoiXCI1MzBmNTYzZi03Y2U4LTQyMzYtYTRjZC01ODcxMTlkYzQ5MjRcIiIsImlhdCI6MTcyODY1MzQzNCwiZXhwIjoxNzYwMTg5NDM0fQ.flURX8L3r6g1l8_4XTzmnccIOX0i9JJiA8X_fOXWBG4",
        },
      },
    }),
  });
  
  const getCurrentUser = async () => {
    try {
      const member =  myWixClient.auth.loggedIn();
      // ? await myWixClient.members.getCurrentMember()
      // : {};

      console.log("current user ==>", member);
    } catch (error) {
      console.log("error", error);
    }
  };
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
  });

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (!fontsLoaded) {
    return <CMLoader size={20} />;
  }

  return (
    <View style={styles.mainContainer}>
      {/*  Header component */}
      <View style={styles.headerContainer}>
        <CMHomeHeader useInScreen={"home"} />
      </View>
      <ScrollView
        style={{ top: 90 }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/*  heading of main home page  */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Statistics</Text>
        </View>
        <View style={styles.cardContainer}>
          {/*  Main Card Component  */}
          {/* <Text style={styles.headingText} >Statistics</Text> */}
          <CMHomeCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: ThemeBgColors.mainBg,
  },
  headerContainer: {
    top: 60,
  },
  headingContainer: {
    flexDirection: "row",
    paddingHorizontal: 27,
  },
  headingText: {
    fontFamily: "Jakarta-Sans-bold",
    fontSize: 28,
    color: ThemeTextColors.darkGray1,
  },
  cardContainer: {
    paddingHorizontal: 29,
    top: 30,
  },
  scrollViewContent: {
    paddingBottom: 190, // Add some bottom padding to prevent content being hidden
  },
});
