import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import { colors, spacingY } from "@/constants/theme";
import { ModalWrapperProps } from "@/types";

// Fix the comparison operator
const isIos = Platform.OS === "ios";

const ModalWrapper = ({
  style,
  children,
  bg = colors.neutral900,
}: ModalWrapperProps) => {
  return (
    <View style={[styles.container, { backgroundColor: bg }, style && style]}>
      {children}
    </View>
  );
};

export default ModalWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isIos ? spacingY._15 : 44, //50,
    paddingBottom: isIos ? spacingY._20 : spacingY._10,
  },
});
