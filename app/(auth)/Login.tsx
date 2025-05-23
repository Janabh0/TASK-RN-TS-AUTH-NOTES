import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import colors from "../../data/styling/colors";
import { login } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import UserInfo from "../../types/UserInfo";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: (userInfo: UserInfo) => login(userInfo),
    onSuccess: () => {
      setIsAuthenticated(true);
      router.push("/(tabs)");
    },
  });

  const handleLogin = () => {
    loginUser({ email, password });
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
          <Text style={{ color: colors.white, fontSize: 16 }}>
            Login to your account
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

          <TouchableOpacity
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
              alignItems: "center",
              opacity: isPending ? 0.7 : 1,
            }}
            onPress={handleLogin}
            disabled={isPending}
          >
            <Text
              style={{
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {isPending ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 20, alignItems: "center" }}
            onPress={() => router.push("/register")}
          >
            <Text style={{ color: colors.white, fontSize: 16 }}>
              Don't have an account?{" "}
              <Text style={{ color: colors.white, fontWeight: "bold" }}>
                Register
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({});
