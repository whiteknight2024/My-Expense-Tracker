import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Typo from "./Typo";
import { HeaderProps } from "@/types";

const Header = ({ title = "", leftIcon, style }: HeaderProps) => {
  return (
    <View>
      <Typo>Header</Typo>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
//video 6 1:10s
