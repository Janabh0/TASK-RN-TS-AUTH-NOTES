import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import colors from "../data/styling/colors";
import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { getToken } from "../api/auth";

export default function RootLayout() {
  const queryClient = new QueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        setIsAuthenticated(true);
      }
    };
    checkToken();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
        <QueryClientProvider client={queryClient}>
          <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </AuthContext.Provider>
        </QueryClientProvider>
        <StatusBar barStyle={"light-content"} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
