import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeCard from "../../components/CMHomeCard";
import CMLoader from "../../components/CMLoader";
import { ApiKeyStrategy, createClient, OAuthStrategy } from "@wix/sdk";
import { members } from "@wix/members";
import { QueryClient, useQueryClient, useQuery } from "@tanstack/react-query";
import { ErrorView } from "../../components/ErrorView/ErrorView";

const HomeScreen = () => {
  const queryClient = useQueryClient();
  // //Wix headless create client method for auth clientId
  const myWixClient = createClient({
    modules: {
      members,
    },
    auth: OAuthStrategy({
      clientId: "0715f53d-fb36-46bd-8fce-7f151bf279ee",
    }),
  });

  const getCurrentMemberRes = useQuery(["currentMember"], () =>
    myWixClient.members.getCurrentMember(),
  );
  // console.log("getCurrentMemberRes", getCurrentMemberRes);
  const [currentMember, setCurrentMember] = useState(null);

  useEffect(() => {
    const fetchCurrentMember = async () => {
      const { member } = await myWixClient.members.getCurrentMember();

      setCurrentMember(member);
    };
    fetchCurrentMember();
  }, []);

  console.log("currentMember", currentMember);

  if (getCurrentMemberRes.isError) {
    return <ErrorView message={getCurrentMemberRes.error.message} />;
  }

  if (getCurrentMemberRes.isLoading || !currentMember) {
    return <CMLoader size={30} />;
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
