import { SafeAreaView, ScrollView, View } from "react-native";
import { MemberHandler } from "../../../authentication/MemberHandler";
import { useWixSession } from "../../../authentication/session";
import { SimpleHeader } from "../../../components/Header/SimpleHeader";
import { styles } from "../../../styles/members/styles";
import { MemberView } from "./MemberView";
import { SignInView } from "./SignInView";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LoginScreen from "../../login/LoginScreen";
import HomeScreen from "../../home/HomeScreen";

const MemberArea = () => {
  const { session } = useWixSession();
  console.log("session", session);
  if (session.refreshToken.role !== "member") {
    return <LoginScreen />;
  } else {
    return <HomeScreen />;
  }
};

export const MemberAreaScreen = ({ navigation }) => {
  return <MemberArea />;
};
