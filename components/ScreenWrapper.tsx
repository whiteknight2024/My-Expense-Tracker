// import {
//   Dimensions,
//   Platform,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import React from "react";
// import { ScreenWrapperProps } from "@/types";
// import { colors } from "@/constants/theme";

// const { height } = Dimensions.get("window");

// const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
//   let paddingTop = Platform.OS === "ios" ? height * 0.06 : 50;
//   return (
//     <View
//       style={[
//         {
//           paddingTop,
//           flex: 1,
//           backgroundColor: colors.neutral900,
//         },
//         style,
//       ]}
//     >
//       <StatusBar barStyle="light-content" />
//       {children}
//     </View>
//   );
// };

// export default ScreenWrapper;

// const styles = StyleSheet.create({});

import React from "react";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenWrapperProps } from "@/types";
import { colors } from "@/constants/theme";

const { height } = Dimensions.get("window");

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  const insets = useSafeAreaInsets();

  /* 
  IPAD ADDITIONAL LOGIC
  const { height, width } = Dimensions.get("window");

const isTablet = Platform.OS === "ios" && (height / width) < 1.6; // Simple check for iPad

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  const insets = useSafeAreaInsets();

  // Calculate paddingTop using platform-specific logic and iPad check
  let platformPaddingTop = Platform.OS === "ios" ? (isTablet ? 30 : height * 0.06) : 50;

  // Adjust paddingTop to only use insets.top if it's greater than platformPaddingTop
  const paddingTop = Math.max(platformPaddingTop, insets.top);
 */

  // Calculate paddingTop using platform-specific logic
  let platformPaddingTop = Platform.OS === "ios" ? height * 0.06 : 50;

  // Adjust paddingTop to only use insets.top if it's greater than platformPaddingTop
  const paddingTop = Math.max(platformPaddingTop, insets.top);

  return (
    <View
      style={[
        {
          paddingTop,
          flex: 1,
          backgroundColor: colors.neutral900,
        },
        style,
      ]}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      {children}
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
