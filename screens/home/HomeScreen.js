import { ScrollView, StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useEffect, useState } from "react";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeCard from "../../components/CMHomeCard";
import CMLoader from "../../components/CMLoader";
import { ApiKeyStrategy, createClient, OAuthStrategy } from "@wix/sdk";
import { members } from "@wix/members";
import { QueryClient, useQueryClient, useQuery } from "@tanstack/react-query";
import { ErrorView } from "../../components/ErrorView/ErrorView";
import { redirects } from "@wix/redirects";
import { myWixClient } from "../../utils/createClient";
import { useFonts } from "expo-font";

const HomeScreen = () => {
  const queryClient = useQueryClient();
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
  });

  const [leaderboardData, setLeaderboardData] = useState("");
  const getCurrentMemberRes = useQuery(["currentMember"], () =>
    myWixClient.members.getCurrentMember({ fieldSet: "FULL" }),
  );
  // console.log("getCurrentMemberRes", getCurrentMemberRes);
  const [currentMember, setCurrentMember] = useState(null);

  useEffect(() => {
    const fetchCurrentMember = async () => {
      const { member } = await myWixClient.members.getCurrentMember({
        fieldSet: "FULL",
      });

      setCurrentMember(member);
    };
    fetchCurrentMember();
  }, []);

  const getLeaderboardDataByUserId = async () => {
    try {
      const options = {
        dataCollectionId: "leaderboard",
        referencedItemOptions: [
          {
            fieldName: "user_id",
            limit: 100,
          },
        ],
      };
      //get  leaderboard data by user id
      const getLeaderboardDataByUserIdRes = await myWixClient.items
        .queryDataItems(options)
        .eq("user_id", currentMember._id)
        .find();
      // console.log(
      //   "total points",
      //   getLeaderboardDataByUserIdRes._items[0].data
      // );
      setLeaderboardData(getLeaderboardDataByUserIdRes._items[0].data);
    } catch (error) {
      console.log(
        "error in getLeaderboardDataByUserId ==>",
        getLeaderboardDataByUserId,
      );
    }
  };

  useEffect(() => {
    getLeaderboardDataByUserId();
  }, [currentMember]);

  console.log("currentMember", currentMember);
  console.log("Leaderboard data state", leaderboardData);

  if (getCurrentMemberRes.isError) {
    return ToastAndroid.show(
      getCurrentMemberRes.error.message,
      ToastAndroid.SHORT,
    );
  }

  if (getCurrentMemberRes.isLoading || !currentMember) {
    return <CMLoader size={30} />;
  }

  const { profile } = currentMember || {};
  if (!fontsLoaded) {
    return <CMLoader size={20} />;
  }
  return (
    <View style={styles.mainContainer}>
      {/*  Header component */}
      <View style={styles.headerContainer}>
        <CMHomeHeader
          profileImage={profile?.photo?.url}
          name={profile?.nickname}
          useInScreen={"home"}
        />
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
          <CMHomeCard
            totalPoints={leaderboardData.total_entries_points}
            profileImage={profile?.photo?.url}
          />
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
