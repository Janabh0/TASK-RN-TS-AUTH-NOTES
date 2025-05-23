import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import colors from "../../data/styling/colors";
import { register } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";
// import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import UserInfo from "../../types/UserInfo";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: async (userInfo: UserInfo) => {
      const formData = new FormData();
      formData.append("email", userInfo.email);
      formData.append("password", userInfo.password);

      if (image) {
        const imageFile = {
          uri: image,
          type: "image/jpeg",
          name: "profile.jpg",
        };
        formData.append("image", imageFile as any);
      }

      return register(formData);
    },
    onSuccess: () => {
      router.push("/login");
    },
  });

  const pickImage = async () => {
    // Temporarily commented out until expo-image-picker is properly installed
    // try {
    //   const result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //     allowsEditing: true,
    //     aspect: [4, 3],
    //     quality: 1,
    //   });
    //   if (!result.canceled) {
    //     setImage(result.assets[0].uri);
    //   }
    // } catch (error) {
    //   console.error("Error picking image:", error);
    // }
  };

  const handleRegister = () => {
    registerUser({ email, password });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%", padding: 20 }}>
          <Text
            style={{
              color: colors.white,
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Register
          </Text>
          <Text style={{ color: colors.white, fontSize: 16 }}>
            Create your account
          </Text>

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={{ marginTop: 20 }} onPress={pickImage}>
            <Text style={{ color: colors.white, fontSize: 16 }}>
              {image ? "Change Profile Image" : "Upload Profile Image"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
              alignItems: "center",
              opacity: isPending ? 0.7 : 1,
            }}
            onPress={handleRegister}
            disabled={isPending}
          >
            <Text
              style={{
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {isPending ? "Registering..." : "Register"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 20, alignItems: "center" }}
            onPress={() => router.push("/login")}
          >
            <Text style={{ color: colors.white, fontSize: 16 }}>
              Already have an account?{" "}
              <Text style={{ color: colors.white, fontWeight: "bold" }}>
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({});
