import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ImageUploadProps } from "@/types";
import * as Icons from "phosphor-react-native";
import { colors } from "@/constants/theme";

const ImageUpload = ({
  file = null,
  onSelect,
  onClear,
  containerStyle,
  imageStyle,
  placeholder = "",
}: ImageUploadProps) => {
  return (
    <View>
      {!file && (
        <TouchableOpacity>
          <Icons.UploadSimple color={colors.neutral200} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({});
