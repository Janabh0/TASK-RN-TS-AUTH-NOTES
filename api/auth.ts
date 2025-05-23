import UserInfo from "@/types/UserInfo";
import instance from ".";
import * as SecureStore from "expo-secure-store";

const storeToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync("token", token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync("token");
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

const login = async (userInfo: UserInfo) => {
  try {
    const { data } = await instance.post("/auth/login", userInfo);
    await storeToken(data.token);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const register = async (formData: FormData | UserInfo) => {
  try {
    const { data } = await instance.post("/auth/register", formData);
    await storeToken(data.token);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const me = async () => {
  const { data } = await instance.get("/auth/me");
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/auth/users");
  return data;
};

export { login, register, me, getAllUsers };
