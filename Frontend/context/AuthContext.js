import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, checkAuth } from "../api/auth.api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem("user");
                if (userData) {
                    setUser(JSON.parse(userData));
                }
            } catch (error) {
                console.error("Failed to load user data", error);
            }
        };

        loadUserData();
    }, []);

    const handleLogin = async (user, password) => {

        const response = await login(user, password);
        console.log(response);
        if (response.status === 200) {
            const userData = response.data.user;
            setUser(userData);
            await AsyncStorage.setItem("user", JSON.stringify(userData));
            await AsyncStorage.setItem("token", response.data.token);   
            return userData;
        } else {
            setUser(null);
            await AsyncStorage.removeItem("user");
            return false;
        }
    };

    const handleLogout = async () => {
        setUser(null);
        await logout();
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("token");
        return true;
    };

    const updateProfile = async (user) => {
        try {
            setUser(user);
            await AsyncStorage.setItem("user", JSON.stringify(user));
            return true;
        } catch (error) {
            console.error("Error updating profile", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}