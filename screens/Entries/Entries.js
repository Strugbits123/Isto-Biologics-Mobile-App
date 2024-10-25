import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeBgColors, ThemeTextColors } from "../../theme/theme";
import CMHomeHeader from "../../components/CMHeader/CMHomeHeader";
import CMEntryCard from "../../components/CMEntryCard";
import { myWixClient } from "../../utils/createClient";
import CMLoader from "../../components/CMLoader";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { CurrentMemberContext } from "../../components/CurrentMemberHandler";

const Entries = () => {
  const route = useRoute();
  const { id } = route.params || {};
  const { currentMemberData, updateCurrentMemberData } =
    useContext(CurrentMemberContext);
  const [currentMember, setCurrentMember] = useState({});
  useEffect(() => {
    const fetchCurrentMember = async () => {
      const { member } = await myWixClient.members.getCurrentMember({
        fieldSet: "FULL",
      });
      console.log("run");
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
    <>
      <View style={styles.mainContainer}>
        {/*  Header component */}
        <View style={styles.headerContainer}>
          <CMHomeHeader
            profileImage={profile?.photo?.url}
            name={profile?.nickname}
          />
        </View>
        <View
          style={{ top: 90 }}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/*  heading of Entries page  */}
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Entires</Text>
          </View>
        </View>
        {/*  Entries Card Component  */}
        <View style={styles.cardContainer}>
          <CMEntryCard
            id={currentMemberData?._id}
            currentMember={currentMemberData}
          />
        </View>
      </View>
    </>
  );
};

export default Entries;

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
    top: 100,
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
