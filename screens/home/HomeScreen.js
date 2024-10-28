import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeCard from "../../components/CMHomeCard";
import CMLoader from "../../components/CMLoader";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { myWixClient } from "../../utils/createClient";
import { useFonts } from "expo-font";
import { useFocusEffect } from "@react-navigation/native";
import { PointsContext } from "../../components/PointsHandler";
import { CurrentMemberContext } from "../../components/CurrentMemberHandler";
import Toast from "../../components/Toast/Toast";

const HomeScreen = ({ isLoggedIn }) => {
  const { currentMemberData, updateCurrentMemberData } =
    useContext(CurrentMemberContext);
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [iconType, setIconType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
  });
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [currentMember, setCurrentMember] = useState(null);

  const getCurrentMemberRes = useQuery(
    ["currentMember"],
    () => myWixClient.members.getCurrentMember({ fieldSet: "FULL" }),
    {
      refetchOnWindowFocus: true,
      onSuccess: (data) => {
        setCurrentMember(data.member);
      },
    },
  );

  const getLeaderboardDataByUserId = async (memberId) => {
    setIsLoading(true);
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
      const getLeaderboardDataByUserIdRes = await myWixClient.items
        .queryDataItems(options)
        .eq("user_id", memberId)
        .find();
      // console.log(
      //   "getLeaderboardDataByUserIdRes",
      //   getLeaderboardDataByUserIdRes,
      // );
      setLeaderboardData(getLeaderboardDataByUserIdRes?._items[0]?.data);
    } catch (error) {
      console.log("error in getLeaderboardDataByUserId ==>", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // console.log("currentMember home", currentMember);
    updateCurrentMemberData(currentMember);
  }, [currentMember]);

  useEffect(() => {
    if (currentMember?._id) {
      // console.log("first time getLeaderboardDataByUserId run ");
      getLeaderboardDataByUserId(currentMember?._id);
    }
  }, [currentMember]);

  // Invalidate and refetch the query when login state changes
  useEffect(() => {
    // console.log("isLogged in Home", isLoggedIn);
    if (isLoggedIn) {
      queryClient.invalidateQueries(["currentMember"]); // This will refetch the current member data after login
    }
  }, [isLoggedIn]);

  if (getCurrentMemberRes.isError) {
    setToastVisible(true);
    setIconType("error");
    setErrorMessage(getCurrentMemberRes.error.message);
    setTimeout(() => {
      setToastVisible(false);
    }, 5000);
    return;
  }

  if (getCurrentMemberRes.isLoading || !currentMember) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CMLoader size={50} />
      </View>
    );
  }

  const { profile, contact } = currentMember || {};

  if (!fontsLoaded) {
    return <CMLoader size={20} />;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <CMHomeHeader
          profileImage={
            currentMemberData?.profile?.photo?.url || profile?.photo?.url
          }
          name={currentMemberData?.profile?.nickname || profile?.nickname}
          fullName={currentMemberData?.contact?.firstName || contact?.firstName}
          useInScreen={"home"}
        />
      </View>
      <ScrollView
        style={{ top: 90 }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Statistics</Text>
        </View>
        <View style={styles.cardContainer}>
          <CMHomeCard
            isLoading={isLoading}
            totalPointsProducts={leaderboardData?.total_products_points}
            totalPointsLeaderboard={leaderboardData?.total_entries_points}
            totalHospitalPoints={leaderboardData?.total_hospital_points}
            totalDoctorPoints={leaderboardData?.total_doctor_points}
            profileImage={
              currentMemberData?.profile?.photo?.url || profile?.photo?.url
            }
            fullName={
              currentMemberData?.contact?.firstName || contact?.firstName
            }
            name={currentMemberData?.profile?.nickname || profile?.nickname}
            id={currentMember?._id}
            setReloadData={setReloadData}
          />
        </View>
      </ScrollView>
      <Toast visible={toastVisible} type={iconType} message={errorMessage} />
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
    paddingBottom: 190,
  },
});
