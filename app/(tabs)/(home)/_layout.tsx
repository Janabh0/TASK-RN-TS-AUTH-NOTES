import colors from "../../../data/styling/colors";
import { Stack } from "expo-router";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AuthContext from "../../../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const HomeLayout = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          color: colors.white,
        },
        headerTintColor: colors.white,
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
            <Ionicons name="log-out-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Notes",
        }}
      />
      <Stack.Screen
        name="[noteId]"
        options={{
          title: "Note Details",
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
