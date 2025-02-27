import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Typo from "./Typo";
import { WalletType } from "@/types";
import { Router } from "expo-router";

const WalletListItem = ({
  item,
  index,
  router,
}: {
  item: WalletType;
  index: number;
  router: Router;
}) => {
  return (
    <View>
      <TouchableOpacity></TouchableOpacity>
    </View>
  );
};

export default WalletListItem;

const styles = StyleSheet.create({});
