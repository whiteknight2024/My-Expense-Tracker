//21.57

import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";

const Welcome = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* login button and image */}
        <View>
          <TouchableOpacity style={styles.loginButton}>
            <Typo fontWeight={"500"}>Sign In</Typo>
          </TouchableOpacity>
          <Image
            style={styles.welcomeImage}
            source={require("@/assets/images/welcome.png")}
            resizeMode="contain"
          />
        </View>
        {/* footer */}
        <View style={styles.footer}>
          <View style={{ alignItems: "center" }}>
            <Typo size={20} fontWeight={800}>
              Always take control
            </Typo>
            <Typo size={20} fontWeight={800}>
              of your finances
            </Typo>
          </View>
          <View style={{ alignItems: "center", gap: 2 }}>
            <Typo size={10} color={colors.textLight}>
              Finances must be arranged to set a better
            </Typo>
            <Typo size={10} color={colors.textLight}>
              lifestyle in future.
            </Typo>
          </View>
          <View style={styles.buttonContainer}></View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: spacingY._7,
  },
  welcomeImage: {
    marginTop: verticalScale(100),
    width: "100%",
    height: verticalScale(300),
    alignSelf: "center",
  },
  loginButton: {
    alignSelf: "flex-end",
    marginRight: spacingX._20,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
  },
});
