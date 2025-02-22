import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { InputProps } from "@/types";

const Input = (props: InputProps) => {
  return (
    <View
      style={[styles.container, props.containerStyle && props.containerStyle]}
    >
      <Text>Input</Text>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {},
});
//8.21
