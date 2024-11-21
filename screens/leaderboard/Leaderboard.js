import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import {
  productsBgColors,
  rankBgColors,
  ThemeBgColors,
  ThemeTextColors,
} from "../../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import CMHeader from "../../components/CMHeader/CMHeader";
import MenIcon from "../../Icons/MenIcon";
import CMLoader from "../../components/CMLoader";
import {
  useFonts,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import CrownIcon from "../../Icons/CrownIcon";
import CMline from "../../components/CMline";
import { myWixClient } from "../../utils/createClient";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { CurrentMemberContext } from "../../components/CurrentMemberHandler";
import { Dimensions, PixelRatio } from "react-native";
import CrownFrameIcon from "../../Icons/CrownFrameIcon";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const scaleFontSize = (size) => {
  const scale = SCREEN_WIDTH / 430; // iPhone 14 Plus width as the base
  return PixelRatio.roundToNearestPixel(size * scale);
};
// Adjusts dimensions based on iPhone 14 Plus width
const scaleSize = (size) => {
  const scale = SCREEN_WIDTH / 430;
  return PixelRatio.roundToNearestPixel(size * scale);
};

//leaderboard object data for dynamic pages
const productCategoryConfig = {
  Magellan: {
    colors: [productsBgColors.magellan1, productsBgColors.magellan2],
    iconColor: ThemeBgColors.white,
    headerTitle: "Magellan",
    points_field: "total_magellan_points",
    rankingName: ThemeTextColors.white,
    headerTitleStyle: { color: ThemeBgColors.white },
  },
  Influx: {
    colors: [productsBgColors.influx, productsBgColors.influx],
    iconColor: ThemeTextColors.darkGray1,
    headerTitle: "Influx",
    points_field: "total_influx_points",
    rankingName: ThemeTextColors.darkGray1,
    headerTitleStyle: { color: ThemeTextColors.darkGray1 },
  },
  SPARC: {
    colors: [productsBgColors.sparc1, productsBgColors.sparc2],
    iconColor: ThemeTextColors.white,
    headerTitle: "SPARC",
    points_field: "total_sparc_points",
    rankingName: ThemeTextColors.white,
    headerTitleStyle: { color: ThemeTextColors.white },
  },
  InQu: {
    colors: [productsBgColors.inqu, productsBgColors.inqu],
    iconColor: ThemeTextColors.white,
    headerTitle: "InQu",
    points_field: "total_inqu_points",
    rankingName: ThemeTextColors.white,
    headerTitleStyle: { color: ThemeTextColors.white },
  },
  Fibrant: {
    colors: [productsBgColors.fibrant, productsBgColors.fibrant],
    iconColor: ThemeTextColors.white,
    headerTitle: "Fibrant",
    points_field: "total_fibrant_points",
    rankingName: ThemeTextColors.white,
    headerTitleStyle: { color: ThemeTextColors.white },
  },
  ProteiOS: {
    colors: [productsBgColors.proteios, productsBgColors.proteios],
    iconColor: ThemeTextColors.white,
    headerTitle: "ProteiOS",
    points_field: "total_proteios_points",
    rankingName: ThemeTextColors.white,
    headerTitleStyle: { color: ThemeTextColors.white },
  },
  Leaderboard: {
    colors: [productsBgColors.leaderboard1, productsBgColors.leaderboard2],
    iconColor: ThemeBgColors.white,
    headerTitle: "Leaderboard",
    points_field: "total_entries_points",
    rankingName: ThemeTextColors.white,
    headerTitleStyle: { color: ThemeBgColors.white },
  },
};

const Leaderboard = () => {
  const route = useRoute();
  const { id } = route.params || {};
  const { currentMemberData, updateCurrentMemberData } =
    useContext(CurrentMemberContext);
  const [headerData, setHeaderData] = useState({});
  const [productCategory, setProductCategory] = useState("Leaderboard");
  const [LeaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { profile, contact } = currentMemberData || {};

  let [fontsLoaded, error] = useFonts({
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    PlusJakartaSans_600SemiBold,
  });

  // let leaderboardData = [];
  const getLeaderboardData = async () => {
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
      //get all leaderboard data
      const getLeaderboardData = await myWixClient.items
        .queryDataItems(options)
        .find();
      // console.log("getLeaderboardData", getLeaderboardData._items);

      //sort highest to lowest according to the point
      const sortedData = getLeaderboardData.items.sort(
        (a, b) =>
          b.data[headerData.points_field] - a.data[headerData.points_field],
      );

      setLeaderboardData(sortedData);
    } catch (error) {
      console.log("error in queryDataItems", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Pull-to-refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await getLeaderboardData(); // Refresh data
    setRefreshing(false); // End refreshing state
  };
  useEffect(() => {
    getLeaderboardData();
  }, [headerData]);

  //product categories for filter or navigation in screen
  const productCategories = [
    "Leaderboard",
    "Magellan",
    "Influx",
    "SPARC",
    "InQu",
    "Fibrant",
    "ProteiOS",
  ];

  //data dynamic show all categories when navigate categories
  useEffect(() => {
    setHeaderData(productCategoryConfig[productCategory]);
  }, [productCategory]);

  // Render a single leaderboard item
  console.log("leaderboardData==>",LeaderboardData[2]?.data.user_id);

  //flatlist rederItem function for render list
  const renderItem = ({ item, index }) => {
    // Example: Define your ID to compare for checking if it's "myRank"
    const myRankId = currentMemberData?._id || id;
    // console.log("myRankId",myRankId)
    const isMyRank = item?.data?.user_id?._id === myRankId;

    // Adjust the index to start ranking from 4
    const rank = index + 1; // Start rank from 4 instead of 1

    return (
      <View key={item?.data?.user_id?._id}>
        {/* Apply gradient only if it's my rank */}
        {isMyRank ? (
          <LinearGradient
            colors={["rgba(240, 80, 37, 0.2)", "rgba(240, 80, 37, 0.03)"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.itemContainer,
              styles.myRankContainer, // Special styling for my rank
            ]}
          >
            {/* Render adjusted rank using rank variable */}
            <Text style={[styles.rankText, styles.myRankText]}>{rank}</Text>
            {item?.data?.user_id?.profilePhoto ? (
              <Image
                source={{ uri: item?.data?.user_id?.profilePhoto }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImage}>
                <MenIcon width={scaleSize(25)} height={scaleSize(21)} />
              </View>
            )}
            <Text style={[styles.nameText, styles.myRankText]}>
              {item?.data?.user_id?.firstName || item?.data?.user_id?.nickname}
            </Text>
            <Text style={[styles.scoreText, styles.myRankText]}>
              {item.data[headerData.points_field]}
            </Text>
          </LinearGradient>
        ) : (
          // Default item layout for other ranks
          <View style={styles.itemContainer}>
            {/* Render adjusted rank using rank variable */}
            <Text style={styles.rankText}>{rank}</Text>
            {item?.data?.user_id?.profilePhoto ? (
              <Image
                source={{ uri: item?.data?.user_id?.profilePhoto }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImage}>
                <MenIcon width={scaleSize(25)} height={scaleSize(21)} />
              </View>
            )}
            <Text style={styles.nameText}>
              {item?.data?.user_id?.firstName || item?.data?.user_id?.nickname}
            </Text>
            <Text style={styles.scoreText}>
              {item.data[headerData.points_field]}
            </Text>
          </View>
        )}
        <CMline />
      </View>
    );
  };

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <LinearGradient
      colors={
        headerData.colors || [
          productsBgColors.leaderboard1,
          productsBgColors.leaderboard2,
        ]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/*  Header component */}
      <View style={styles.headerContainer}>
        <CMHeader
          iconColor={headerData.iconColor}
          headerTitle={headerData.headerTitle}
          titleStyle={headerData.headerTitleStyle}
        />
      </View>

      {/* container for ranking 1 2 3 */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          top: scaleSize(80),
          gap: scaleSize(12),
          marginHorizontal: scaleSize(30),
        }}
      >
        {/* container rank 02 */}
        <View style={{ gap: scaleSize(15), top: scaleSize(40), flex: 1 }}>
          {/* profile and name container */}
          <View
            style={{
              gap: scaleSize(5),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Profile image or placeholder for Rank 02 */}
            <View style={styles.imageContainer}>
              {LeaderboardData.length > 1 &&
              LeaderboardData[1]?.data?.user_id?.profilePhoto ? (
                <Image
                  source={{ uri: LeaderboardData[1]?.data?.user_id?.profilePhoto }}
                  style={styles.positionsProfileImage}
                />
              ) : (
                <View style={styles.positionsProfileImage}>
                  <MenIcon width={scaleSize(30)} height={scaleSize(30)} />
                </View>
              )}
            </View>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_700Bold",
                fontSize: scaleFontSize(15),
                color: headerData.rankingName,
              }}
            >
              {LeaderboardData.length > 1
                ? LeaderboardData[1]?.data?.user_id?.firstName ||
                  LeaderboardData[1]?.data?.user_id?.nickname
                : "User"}
            </Text>
          </View>
          {/* Rank number container */}
          <View>
            <LinearGradient
              colors={[rankBgColors.secondRank1, rankBgColors.secondRank2]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.numberBox2}
            >
              <Text style={styles.numberText}>02</Text>
            </LinearGradient>
          </View>
        </View>

        {/* container rank 01 */}
        <View style={{ gap: scaleSize(25), flex: 1 }}>
          {/* profile and name container */}
          <View
            style={{
              gap: scaleSize(5),
              justifyContent: "center",
              alignItems: "center",
              top: scaleSize(10),
            }}
          >
            {/* Profile image or placeholder for Rank 01 */}
            <View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={styles.imageContainerCrown}>
                  {LeaderboardData.length > 0 &&
                  LeaderboardData[0]?.data?.user_id?.profilePhoto ? (
                    <Image
                      source={{
                        uri: LeaderboardData[0]?.data?.user_id?.profilePhoto,
                      }}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: scaleSize(70),
                        height: scaleSize(70),
                        borderRadius: scaleSize(60),
                      }}
                    />
                  ) : (
                    <View style={styles.positionsProfileImage}>
                      <MenIcon width={scaleSize(30)} height={scaleSize(30)} />
                    </View>
                  )}
                </View>
                <View style={styles.crownContainer}>
                  <CrownFrameIcon
                    width={scaleSize(94)}
                    height={scaleSize(92)}
                  />
                  {/* Adjust crown size */}
                </View>
              </View>
            </View>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_700Bold",
                fontSize: scaleFontSize(15),
                color: headerData.rankingName,
              }}
            >
              {LeaderboardData.length > 0
                ? LeaderboardData[0]?.data?.user_id?.firstName ||
                  LeaderboardData[0]?.data?.user_id?.nickname
                : "User"}
            </Text>
          </View>
          {/* Rank number container */}
          <View>
            <LinearGradient
              colors={[rankBgColors.firstRank1, rankBgColors.firstRank2]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.numberBox1}
            >
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_800ExtraBold",
                  fontSize: scaleFontSize(46),
                  color: ThemeTextColors.white,
                }}
              >
                01
              </Text>
            </LinearGradient>
          </View>
        </View>

        {/* container rank 03 */}
        <View style={{ gap: scaleSize(15), top: scaleSize(45), flex: 1 }}>
          {/* profile and name container */}
          <View
            style={{
              gap: scaleSize(5),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Profile image or placeholder for Rank 03 */}
            <View style={styles.imageContainer}>
              {LeaderboardData.length > 2 &&
              LeaderboardData[2]?.data?.user_id?.profilePhoto ? (
                <Image
                  source={{ uri: LeaderboardData[2]?.data?.user_id?.profilePhoto }}
                  style={styles.positionsProfileImage}
                />
              ) : (
                <View style={styles.positionsProfileImage}>
                  <MenIcon width={scaleSize(30)} height={scaleSize(30)} />
                </View>
              )}
            </View>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_700Bold",
                fontSize: scaleFontSize(15),
                color: headerData.rankingName,
              }}
            >
              {LeaderboardData.length > 2
                ? LeaderboardData[2]?.data?.user_id?.firstName ||
                  LeaderboardData[2]?.data?.user_id?.nickname
                : "User"}
            </Text>
          </View>
          {/* Rank number container */}
          <View>
            <LinearGradient
              colors={[rankBgColors.thirdRank1, rankBgColors.thirdRank2]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.numberBox3}
            >
              <Text style={styles.numberText}>03</Text>
            </LinearGradient>
          </View>
        </View>
      </View>

      {/* bottom container for ranking list */}
      <View style={styles.bottomContainer}>
        {/* category navigations list */}
        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categorylistContainer}
          >
            {productCategories.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setProductCategory(category)}
                style={[
                  styles.categoryButton,
                  productCategory === category && styles.activeCategoryButton, // Apply active styles
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    productCategory === category && styles.activeCategoryText, // Apply active text styles
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {isLoading ? (
          <View style={{ flex: 1, top: scaleSize(50) }}>
            <CMLoader size={scaleSize(50)} />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              data={LeaderboardData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={LeaderboardData.length > 0 ? renderItem : null}
              contentContainerStyle={{
                paddingBottom: scaleSize(415),
                flexGrow: 1, // Ensure the FlatList takes the full height
              }}
              ListEmptyComponent={
                // Show a message when the list is empty
                <Text
                  style={{
                    flex: 1,
                    fontSize: scaleFontSize(16),
                    color: ThemeTextColors.placeholder,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Users available. Pull down to refresh.
                </Text>
              }
              showsVerticalScrollIndicator={false}
              refreshing={refreshing} // Bind refreshing state to FlatList
              onRefresh={onRefresh} // Handle pull-to-refresh action
            />
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  headerContainer: {
    top: scaleSize(60),
  },
  bottomContainer: {
    top: scaleSize(70),
    backgroundColor: ThemeBgColors.white,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: scaleSize(25),
    borderTopRightRadius: scaleSize(25),
    paddingTop: scaleSize(10),
    justifyContent: "space-between",
  },
  imageContainer: {
    width: scaleSize(60),
    height: scaleSize(60),
    backgroundColor: ThemeBgColors.white,
    borderRadius: scaleSize(40),
    alignItems: "center",
    justifyContent: "center",
    borderColor: ThemeTextColors.white,
    borderWidth: scaleSize(2),
  },
  imageContainerCrown: {
    width: scaleSize(73),
    height: scaleSize(73),
    backgroundColor: ThemeBgColors.white,
    borderRadius: scaleSize(60),
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: scaleFontSize(13),
    color: "white",
  },
  numberBox1: {
    width: "100%",
    height: scaleSize(90),
    alignItems: "center",
    borderTopLeftRadius: scaleSize(10),
    borderTopRightRadius: scaleSize(10),
    justifyContent: "center",
    paddingBottom: scaleSize(20),
  },
  numberBox2: {
    width: "100%",
    height: scaleSize(70),
    alignItems: "center",
    borderTopLeftRadius: scaleSize(10),
    borderTopRightRadius: scaleSize(10),
  },
  numberBox3: {
    width: "100%",
    height: scaleSize(60),
    alignItems: "center",
    borderTopLeftRadius: scaleSize(10),
    borderTopRightRadius: scaleSize(10),
  },
  numberText: {
    fontFamily: "PlusJakartaSans_800ExtraBold",
    fontSize: scaleFontSize(34),
    color: ThemeTextColors.white,
  },
  categorylistContainer: {
    flexDirection: "row",
    gap: scaleSize(10),
    paddingVertical: scaleSize(20),
    paddingLeft: scaleSize(30),
  },
  categoryButton: {
    paddingBottom: scaleSize(10),
    marginRight: scaleSize(15),
  },
  activeCategoryButton: {
    borderBottomWidth: scaleSize(2), // Red bottom border for active category
    borderBottomColor: ThemeTextColors.darkOrange,
  },
  categoryText: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: scaleFontSize(16),
    color: ThemeTextColors.extraLightGray,
  },
  activeCategoryText: {
    color: ThemeTextColors.darkOrange, // Change the text color to red for the active category
  },
  listContainer: {
    flexGrow: 1, // Allows the FlatList to grow
    paddingBottom: scaleSize(415), // Optional: Add some padding
  },
  itemContainer: {
    paddingHorizontal: scaleSize(30),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scaleSize(10),
  },
  topRankContainer: {
    backgroundColor: "#FFF4E0", // Light background for top ranks
  },
  rankText: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: scaleFontSize(18),
    color: ThemeTextColors.extraLightGray,
    paddingRight: scaleSize(15),
  },
  topRankText: {
    color: "#FF6B6B", // Different color for top ranks
  },
  profileImage: {
    justifyContent: "center",
    alignItems: "center",
    width: scaleSize(50),
    height: scaleSize(50),
    borderRadius: scaleSize(25),
    borderColor: ThemeTextColors.darkGray1,
    borderWidth: scaleSize(1),
  },
  positionsProfileImage: {
    justifyContent: "center",
    alignItems: "center",
    width: scaleSize(60),
    height: scaleSize(60),
    borderRadius: scaleSize(30),
  },
  nameText: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    flex: 1,
    fontSize: scaleFontSize(18),
    color: ThemeTextColors.darkGray1,
    paddingLeft: scaleSize(20),
  },
  scoreText: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: scaleFontSize(19),
    color: ThemeTextColors.extraLightGray,
  },
  topRankScore: {
    color: "#FF6B6B", // Special color for top rank score
  },
  scrollViewContent: {
    paddingBottom: scaleSize(410), // Add some bottom padding to prevent content being hidden
  },
  myRankContainer: {
    backgroundColor: "white", // Light red background for my rank
    borderLeftColor: ThemeTextColors.orange,
    borderLeftWidth: scaleSize(3),
  },
  myRankText: {
    color: "#FF6B6B", // Light red text color for my rank
  },
  crownContainer: {
    position: "absolute",
    top: scaleSize(-18), // Adjust based on how much overlap you want
    right: scaleSize(-19), // Adjust to position the crown on the right
  },
});
