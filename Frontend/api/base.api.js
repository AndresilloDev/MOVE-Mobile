import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "http://192.168.1.72:3000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

api.interceptors.request.use(
    async (config) => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("Token from AsyncStorage:", token);
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error retrieving token from AsyncStorage", error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API Error:", error?.response?.data || error.message);
      return Promise.reject(error);
    }
  );
  
  export default api;