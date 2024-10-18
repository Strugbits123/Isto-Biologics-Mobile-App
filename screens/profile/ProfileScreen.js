import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMProfileCard from "../../components/CMProfileCard";
import { fetchCurrentMember } from "../../authentication/getCurrentMember";
import { myWixClient } from "../../utils/createClient";

const ProfileScreen = () => {
  const [currentMember, setCurrentMember] = useState({});
  useEffect(() => {
    const fetchCurrentMember = async () => {
      const { member } = await myWixClient.members.getCurrentMember({
        fieldSet: "FULL",
      });

      setCurrentMember(member);
    };
    fetchCurrentMember();
  }, []);

  console.log("currentMember", currentMember);
  const { profile } = currentMember || {};

  if (!currentMember) {
    return <CMLoader size={30} />;
  }

  return (
    <View style={styles.mainContainer}>
      {/*  Header component */}
      <View style={styles.headerContainer}>
        <CMHomeHeader
          profileImage={profile?.photo?.url}
          name={profile?.nickname}
        />
      </View>

      <ScrollView
        style={{ top: 80 }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/*  heading of profile page  */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Profile</Text>
        </View>

        {/*  Profile Card Component  */}
        <View style={styles.cardContainer}>
          <CMProfileCard currentMember={currentMember} setCurrentMember={setCurrentMember} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: ThemeBgColors.mainBg,
  },
  headerContainer: {
    top: 60,
  },
  cardContainer: {
    paddingHorizontal: 29,
    top: 30,
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
  scrollViewContent: {
    paddingBottom: 150, // Add some bottom padding to prevent content being hidden
  },
});
