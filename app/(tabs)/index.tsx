import { StyleSheet, Text, View } from "react-native";
import React from "react";
// import Button from "@/components/Button";
import Typo from "@/components/Typo";
// import { colors } from "@/constants/theme";
// import { signOut } from "firebase/auth";
// import { auth } from "@/config/firebase";
import ScreenWrapper from "@/components/ScreenWrapper";

//22.58 add logout button
const Home = () => {
  // const handleLogout = async () => {
  //   await signOut(auth);
  // };

  return (
    <ScreenWrapper>
      <Typo>Home</Typo>
      {/* <Button onPress={handleLogout}>
        <Typo color={colors.black}>Logout</Typo>
      </Button> */}
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
