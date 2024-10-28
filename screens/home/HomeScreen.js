import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeCard from "../../components/CMHomeCard";
import CMLoader from "../../components/CMLoader";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { myWixClient } from "../../utils/createClient";
import { useFonts } from "expo-font";
import { CurrentMemberContext } from "../../components/CurrentMemberHandler";
import Toast from "../../components/Toast/Toast";

const HomeScreen = ({ isLoggedIn }) => {
  const { currentMemberData, updateCurrentMemberData } = useContext(CurrentMemberContext);
  const queryClient = useQueryClient();

  // State variables
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

  // Query to fetch the current member's data
  const getCurrentMemberRes = useQuery(
    ["currentMember"],
    () => myWixClient.members.getCurrentMember({ fieldSet: "FULL" }),
    {
      refetchOnWindowFocus: true,
      onSuccess: (data) => setCurrentMember(data.member),
    },
  );

  // Function to fetch leaderboard data by member ID
  const getLeaderboardDataByUserId = async (memberId) => {
    setIsLoading(true);
    try {
      const options = {
        dataCollectionId: "leaderboard",
        referencedItemOptions: [{ fieldName: "user_id", limit: 100 }],
      };
      const response = await myWixClient.items.queryDataItems(options).eq("user_id", memberId).find();
      setLeaderboardData(response?._items[0]?.data);
    } catch (error) {
      console.error("Error in getLeaderboardDataByUserId:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update context with the current member data
  useEffect(() => {
    updateCurrentMemberData(currentMember);
  }, [currentMember]);

  // Fetch leaderboard data when a valid current member ID is available
  useEffect(() => {
    if (currentMember?._id) {
      getLeaderboardDataByUserId(currentMember?._id);
    }
  }, [currentMember]);

  // Invalidate and refetch current member data when login state changes
  useEffect(() => {
    if (isLoggedIn) {
      queryClient.invalidateQueries(["currentMember"]);
    }
  }, [isLoggedIn]);

  // Display error toast if there's an error in fetching current member data
  if (getCurrentMemberRes.isError) {
    setToastVisible(true);
    setIconType("error");
    setErrorMessage(getCurrentMemberRes.error.message);
    setTimeout(() => setToastVisible(false), 5000);
    return;
  }

  // Show loader while data or fonts are still loading
  if (getCurrentMemberRes.isLoading || !currentMember || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CMLoader size={50} />
      </View>
    );
  }

  // Destructure data for ease of use
  const { profile, contact } = currentMember || {};

  return (
    <View style={styles.mainContainer}>
      {/* Header with profile information */}
      <View style={styles.headerContainer}>
        <CMHomeHeader
          profileImage={currentMemberData?.profile?.photo?.url || profile?.photo?.url}
          name={currentMemberData?.profile?.nickname || profile?.nickname}
          fullName={currentMemberData?.contact?.firstName || contact?.firstName}
          useInScreen={"home"}
        />
      </View>
      {/* Scrollable content section */}
      <ScrollView style={{ top: 90 }} contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Statistics</Text>
        </View>
        {/* Card displaying leaderboard and points information */}
        <View style={styles.cardContainer}>
          <CMHomeCard
            isLoading={isLoading}
            totalPointsProducts={leaderboardData?.total_products_points}
            totalPointsLeaderboard={leaderboardData?.total_entries_points}
            totalHospitalPoints={leaderboardData?.total_hospital_points}
            totalDoctorPoints={leaderboardData?.total_doctor_points}
            profileImage={currentMemberData?.profile?.photo?.url || profile?.photo?.url}
            fullName={currentMemberData?.contact?.firstName || contact?.firstName}
            name={currentMemberData?.profile?.nickname || profile?.nickname}
            id={currentMember?._id}
            setReloadData={setReloadData}
          />
        </View>
      </ScrollView>
      {/* Toast component for displaying messages */}
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
