import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Alert,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import * as Icons from "phosphor-react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/authContext";

//14.23 video 4

const Register = () => {
  const emailRef = useRef(""); //usestate will reredner the component
  const passwordRef = useRef(""); //usestate will reredner the component
  const nameRef = useRef(""); //usestate will reredner the component
  const passwordConfirmRef = useRef(""); //usestate will reredner the component
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const router = useRouter();

  const handleSubmit = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !passwordConfirmRef.current ||
      !nameRef.current
    ) {
      if (Platform.OS === "android") {
        //ToastAndroid.show("Please Enter All Information", ToastAndroid.BOTTOM);
        Alert.alert("SignUp Error", "Please Enter All Information");
      } else {
        console.log("Not all data added");
        if (Platform.OS === "web") {
          alert("SignUp Error: Please Enter All Information");
        } else {
          Alert.alert("SignUp Error", "Please Enter All Information");
        }
      }
      return;
    }
    if (!validateEmail(emailRef.current.trim())) {
      if (Platform.OS === "android") {
        // ToastAndroid.show(
        //   "Please Enter a Valid Email Address",
        //   ToastAndroid.BOTTOM
        // );
        Alert.alert("SignUp Error", "Please Enter a Valid Email Address");
      } else {
        console.log("Invalid email format");
        if (Platform.OS === "web") {
          alert("SignUp Error: Please Enter a Valid Email Address");
        } else {
          Alert.alert("SignUp Error", "Please Enter a Valid Email Address");
        }
      }
      return;
    }
    //add logic that password and password confirm
    if (passwordRef.current.trim() != passwordConfirmRef.current.trim()) {
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "Please Please ensure Password and Confirm Password Match",
          ToastAndroid.BOTTOM
        );
        Alert.alert(
          "Validation Error",
          "Please ensure Password and Confirm Password Match"
        );
      } else {
        console.log("Confirm Password Mismatch");
        if (Platform.OS === "web") {
          alert(
            "Validation Error: Please ensure Password and Confirm Password Match"
          );
        } else {
          Alert.alert(
            "Validation Error",
            "Please ensure Password and Confirm Password Match"
          );
        }
      }
      return;
    }

    setIsLoading(true);

    let name = nameRef.current.trim();
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    const res = await registerUser(email, password, name);
    setIsLoading(false);
    console.log("reg result: ", res);
    if (!res.success) {
      Alert.alert("Sign Up", res.msg);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />
        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={800}>
            Let's,
          </Typo>
          <Typo size={30} fontWeight={800}>
            Get Started!
          </Typo>
        </View>
        {/* form */}
        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Create an account to track all your expenses!
          </Typo>
          {/* custom input form fields */}
          <Input
            placeholder="Enter your name"
            onChangeText={(value) => (nameRef.current = value)}
            icon={
              <Icons.User
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
          <Input
            placeholder="Enter your email"
            onChangeText={(value) => (emailRef.current = value)}
            icon={
              <Icons.At
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
          <Input
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={(value) => (passwordRef.current = value)}
            icon={
              <Icons.Lock
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
          <Input
            placeholder="Confirm your password"
            secureTextEntry={true}
            onChangeText={(value) => (passwordConfirmRef.current = value)}
            icon={
              <Icons.Lock
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />

          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo fontWeight={"700"} color={colors.black} size={21}>
              Sign Up
            </Typo>
          </Button>
        </View>
        {/* footer */}
        <View style={styles.footer}>
          <Typo size={15}>Already have an account?</Typo>
          <Pressable onPress={() => router.navigate("/(auth)/login")}>
            <Typo size={15} fontWeight={700} color={colors.primary}>
              Login
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: "500",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});
