import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
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
import { useFonts } from "expo-font";
import CrownIcon from "../../Icons/CrownIcon";
import CMline from "../../components/CMline";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";

const Leaderboard = () => {
  const [headerData, setHeaderData] = useState({});
  const [productCategory, setProductCategory] = useState("Leaderboard");
  const [LeaderboardData, setLeaderboardData] = useState([]);

  const [fontsLoaded] = useFonts({
    "Jakarta-Sans-bold": require("../../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
    "Jakarta-Sans-Extra-bold": require("../../assets/fonts/static/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-Sans-Semi-bold": require("../../assets/fonts/static/PlusJakartaSans-SemiBold.ttf"),
  });

  const myWixClient = createClient({
    modules: { items },
    auth: OAuthStrategy({
      clientId: "0715f53d-fb36-46bd-8fce-7f151bf279ee",
    }),
    // Include the auth strategy and host as relevant
  });
  // let leaderboardData = [];
  const getLeaderboardData = async () => {
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
      console.log("getLeaderboardData", getLeaderboardData._items);

      setLeaderboardData(getLeaderboardData._items);
      //  leaderboardData = getLeaderboardData._items;
    } catch (error) {
      console.log("error in queryDataItems", error);
    }
  };

  useEffect(() => {
    getLeaderboardData();
  }, []);

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
  useEffect(() => {
    // Function to set header data based on productCategory
    const updateHeaderData = () => {
      switch (productCategory) {
        case "Magellan":
          setHeaderData({
            colors: [productsBgColors.magellan1, productsBgColors.magellan2],
            iconColor: ThemeBgColors.white,
            headerTitle: "Magellan",
            headerTitleStyle: {
              color: ThemeBgColors.white,
            },
            rankingName: ThemeTextColors.white,
          });
          break;
        case "Influx":
          setHeaderData({
            colors: [productsBgColors.influx, productsBgColors.influx],
            iconColor: ThemeTextColors.darkGray1,
            headerTitle: "Influx",
            headerTitleStyle: {
              color: ThemeTextColors.darkGray1,
            },
            rankingName: ThemeTextColors.darkGray1,
          });
          break;
        case "SPARC":
          setHeaderData({
            colors: [productsBgColors.sparc1, productsBgColors.sparc2],
            iconColor: ThemeTextColors.white,
            headerTitle: "SPARC",
            headerTitleStyle: {
              color: ThemeTextColors.white,
            },
            rankingName: ThemeTextColors.white,
          });
          break;
        case "InQu":
          setHeaderData({
            colors: [productsBgColors.inqu, productsBgColors.inqu],
            iconColor: ThemeTextColors.white,
            headerTitle: "InQu",
            headerTitleStyle: {
              color: ThemeTextColors.white,
            },
            rankingName: ThemeTextColors.white,
          });
          break;
        case "Fibrant":
          setHeaderData({
            colors: [productsBgColors.fibrant, productsBgColors.fibrant],
            iconColor: ThemeTextColors.white,
            headerTitle: "Fibrant",
            headerTitleStyle: {
              color: ThemeTextColors.white,
            },
            rankingName: ThemeTextColors.white,
          });
          break;
        case "ProteiOS":
          setHeaderData({
            colors: [productsBgColors.proteios, productsBgColors.proteios],
            iconColor: ThemeTextColors.white,
            headerTitle: "ProteiOS",
            headerTitleStyle: {
              color: ThemeTextColors.white,
            },
            rankingName: ThemeTextColors.white,
          });
          break;
        case "Leaderboard":
          setHeaderData({
            colors: [
              productsBgColors.leaderboard1,
              productsBgColors.leaderboard2,
            ],
            iconColor: ThemeBgColors.white,
            headerTitle: "Leaderboard",
            headerTitleStyle: {
              color: ThemeBgColors.white,
            },
            rankingName: ThemeTextColors.white,
          });
          break;
        default:
          break;
      }
    };
    updateHeaderData();
  }, [productCategory]); // useEffect will run when productCategory changes

  //leaderboard random data
  // const leaderboardData = [
  //   {
  //     id: "1",
  //     name: "Alice Warren",
  //     score: 323,
  //     rank: "01",
  //     image: "https://randomuser.me/api/portraits/women/44.jpg",
  //   },
  //   {
  //     id: "2",
  //     name: "Alan Walter",
  //     score: 300,
  //     rank: "02",
  //     image: "https://randomuser.me/api/portraits/men/34.jpg",
  //   },
  //   {
  //     id: "3",
  //     name: "Nial Anderson",
  //     score: 295,
  //     rank: "03",
  //     image: "https://randomuser.me/api/portraits/men/14.jpg",
  //   },
  //   {
  //     id: "4",
  //     name: "Arlene McCoy",
  //     score: 223,
  //     rank: "04",
  //     image: "https://randomuser.me/api/portraits/women/24.jpg",
  //   },
  //   {
  //     id: "5",
  //     name: "Jessica Kemp",
  //     score: 220,
  //     rank: "05",
  //     image: "https://randomuser.me/api/portraits/women/34.jpg",
  //   },
  //   {
  //     id: "6",
  //     name: "Jessica",
  //     score: 500,
  //     rank: "06",
  //     image: "https://randomuser.me/api/portraits/men/34.jpg",
  //   },
  // ];
  // Render a single leaderboard item

  console.log("leaderboardData==>", LeaderboardData);
  const renderItem = ({ item }) => {
    // const myRank = "05"; // Example: Your rank is 02
    // const isMyRank = item.rank === myRank;
    let myRank = item.data.user_id._id = "af0ee3cb-1403-486c-a239-338b6f740759"
    console.log("item==>", item);
    return (
      <>
        {/* Apply gradient only if it's my rank */}
        {myRank ? (
          <LinearGradient
            colors={["rgba(240, 80, 37, 0.2)", "rgba(240, 80, 37, 0.03)"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.itemContainer,
              styles.myRankContainer, // Special styling for my rank
            ]}
          >
            <Text style={[styles.rankText, styles.myRankText]}>
              {item.total_entries_points}
            </Text>
            {item.data.user_id.profilePhoto ? (
              <Image
                source={{ uri: item.data.user_id.profilePhoto }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImage}>
                <MenIcon width={25} height={21} />
              </View>
            )}
            <Text style={[styles.nameText, styles.myRankText]}>
              {item.data.user_id.firstName
                ? item.data.user_id.firstName
                : item.data.user_id.nickname}
            </Text>
            <Text style={[styles.scoreText, styles.myRankText]}>
              {item.data.total_entries_points}
            </Text>
          </LinearGradient>
        ) : (
          // Default item layout for other ranks
          <View style={styles.itemContainer}>
            <Text style={styles.rankText}>
              {item.data.total_entries_points}
            </Text>
            {item.data.user_id.profilePhoto ? (
              <Image
                source={{ uri: item.data.user_id.profilePhoto }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImage}>
                <MenIcon width={25} height={21} />
              </View>
            )}
            <Text style={styles.nameText}>{item.data.user_id.firstName}</Text>
            <Text style={styles.scoreText}>
              {item.data.total_entries_points}
            </Text>
          </View>
        )}
        <CMline />
      </>
    );
  };

  if (!fontsLoaded) {
    return <CMLoader size={20} />;
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

      {/* container for ranking 1 2 3  */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          top: 80,
          gap: 12,
          marginHorizontal: 30,
        }}
      >
        {/* container rank 02 */}
        <View style={{ gap: 15, top: 65, flex: 1 }}>
          {/* profile and name container */}
          <View
            style={{ gap: 5, justifyContent: "center", alignItems: "center" }}
          >
            {/* when this condition got true so render image and must size is 60 60  */}
            <View style={styles.imageContainer}>
              {true ? (
                <MenIcon width={17} height={21} />
              ) : (
                <MenIcon width={17} height={21} />
              )}
            </View>
            <Text
              style={{
                fontFamily: "Jakarta-Sans-bold",
                fontSize: 13,
                color: headerData.rankingName,
              }}
            >
              Alan Walter
            </Text>
          </View>
          {/* rank number container  */}
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
        <View style={{ gap: 15, flex: 1 }}>
          {/* profile and name container */}
          <View
            style={{ gap: 5, justifyContent: "center", alignItems: "center" }}
          >
            {/* when this condition got true so render image and must size is 60 60  */}
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <CrownIcon width={30} height={30} />
              </View>
              <View style={styles.imageContainerCrown}>
                {true ? (
                  <MenIcon width={17} height={21} />
                ) : (
                  <MenIcon width={17} height={21} />
                )}
              </View>
            </View>
            <Text
              style={{
                fontFamily: "Jakarta-Sans-bold",
                fontSize: 13,
                color: headerData.rankingName,
              }}
            >
              Alice Warren
            </Text>
          </View>
          {/* rank number container  */}
          <View>
            <LinearGradient
              colors={[rankBgColors.firstRank1, rankBgColors.firstRank2]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.numberBox1}
            >
              <Text style={styles.numberText}>01</Text>
            </LinearGradient>
          </View>
        </View>
        {/* container rank 03 */}
        <View style={{ gap: 15, top: 75, flex: 1 }}>
          {/* profile and name container */}
          <View
            style={{ gap: 5, justifyContent: "center", alignItems: "center" }}
          >
            {/* when this condition got true so render image and must size is 60 60  */}
            <View style={styles.imageContainer}>
              {true ? (
                <MenIcon width={17} height={21} />
              ) : (
                <MenIcon width={17} height={21} />
              )}
            </View>
            <Text
              style={{
                fontFamily: "Jakarta-Sans-bold",
                fontSize: 13,
                color: headerData.rankingName,
              }}
            >
              Nial Anderson
            </Text>
          </View>
          {/* rank number container  */}
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
        <View style={{ flex: 1 }}>
          <FlatList
            data={LeaderboardData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
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
    top: 60,
  },
  bottomContainer: {
    top: 80,
    backgroundColor: ThemeBgColors.white,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 10,
    justifyContent: "space-between",
  },
  imageContainer: {
    width: 60,
    height: 60,
    backgroundColor: ThemeBgColors.white,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    borderColor: ThemeTextColors.white,
    borderWidth: 1,
  },
  imageContainerCrown: {
    width: 75,
    height: 75,
    backgroundColor: ThemeBgColors.white,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#F5A534",
    borderWidth: 3,
  },
  name: {
    fontFamily: "Jakarta-Sans-bold",
    fontSize: 13,
    color: "white",
  },
  numberBox1: {
    width: "100%",
    height: 90,
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    paddingBottom: 20,
  },
  numberBox2: {
    width: "100%",
    height: 70,
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  numberBox3: {
    width: "100%",
    height: 60,
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  numberText: {
    fontFamily: "Jakarta-Sans-Extra-bold",
    fontSize: 34,
    color: ThemeTextColors.white,
  },
  categorylistContainer: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 20,
    paddingLeft: 30,
  },
  categoryButton: {
    paddingBottom: 10,
    marginRight: 15,
  },
  activeCategoryButton: {
    borderBottomWidth: 2, // Red bottom border for active category
    borderBottomColor: ThemeTextColors.darkOrange,
  },
  categoryText: {
    fontFamily: "Jakarta-Sans-Semi-bold",
    fontSize: 16,
    color: ThemeTextColors.extraLightGray,
  },
  activeCategoryText: {
    color: ThemeTextColors.darkOrange, // Change the text color to red for the active category
  },
  listContainer: {
    flexGrow: 1, // Allows the FlatList to grow
    paddingBottom: 415, // Optional: Add some padding
  },
  itemContainer: {
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  topRankContainer: {
    backgroundColor: "#FFF4E0", // Light background for top ranks
  },
  rankText: {
    fontFamily: "Jakarta-Sans-Semi-bold",
    fontSize: 18,
    color: ThemeTextColors.extraLightGray,
    paddingRight: 15,
  },
  topRankText: {
    color: "#FF6B6B", // Different color for top ranks
  },
  profileImage: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: ThemeTextColors.darkGray1,
    borderWidth: 1,
  },
  nameText: {
    fontFamily: "Jakarta-Sans-Semi-bold",
    flex: 1,
    fontSize: 18,
    color: ThemeTextColors.darkGray1,
    paddingLeft: 20,
  },
  scoreText: {
    fontFamily: "Jakarta-Sans-bold",
    fontSize: 19,
    color: ThemeTextColors.extraLightGray,
  },
  topRankScore: {
    color: "#FF6B6B", // Special color for top rank score
  },
  scrollViewContent: {
    paddingBottom: 410, // Add some bottom padding to prevent content being hidden
  },
  myRankContainer: {
    backgroundColor: "white", // Light red background for my rank
    borderLeftColor: ThemeTextColors.orange,
    borderLeftWidth: 3,
  },
  myRankText: {
    color: "#FF6B6B", // Light red text color for my rank
  },
});
