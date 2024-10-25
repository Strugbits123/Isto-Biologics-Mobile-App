import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMDocsCard from "../../components/CMDocs/CMDocsCard";
import CMLoader from "../../components/CMLoader";
import { myWixClient } from "../../utils/createClient";
import { CurrentMemberContext } from "../../components/CurrentMemberHandler";

const DocsScreen = () => {
  const { currentMemberData, updateCurrentMemberData } = useContext(CurrentMemberContext);
  const [currentMember, setCurrentMember] = useState({});
  // useEffect(() => {
  //   const fetchCurrentMember = async () => {
  //     const { member } = await myWixClient.members.getCurrentMember({
  //       fieldSet: "FULL",
  //     });

  //     setCurrentMember(member);
  //   };
  //   fetchCurrentMember();
  // }, []);

  // console.log("currentMember", currentMember);
  const { profile } = currentMemberData || {};

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
        style={{ top: 90 }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/*  heading of Entries page  */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Contest Rules & Guidelines</Text>
        </View>

        {/*  Entries Card Component  */}
        <View style={styles.cardContainer}>
          <CMDocsCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default DocsScreen;

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
    fontSize: 27,
    color: ThemeTextColors.darkGray1,
  },
  scrollViewContent: {
    paddingBottom: 150, // Add some bottom padding to prevent content being hidden
  },
});
