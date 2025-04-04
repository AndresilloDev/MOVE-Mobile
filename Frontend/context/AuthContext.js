import {createContext, useContext, useEffect, useState} from "react";
import {checkAuth, login, logout} from "../api/auth.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNotification} from "./NotificationContext";
import {useNavigationContainerRef} from "@react-navigation/native";
import {updateUser} from "../api/users.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { getSuccess, getError } = useNotification();
    const navigationRef = useNavigationContainerRef();

    /*
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

     */


    /*

     */
    useEffect(() => {
        const validateToken = async () => {
            try {
                await checkAuth();
            } catch (error) {
                console.log("Token inválido o expirado, cerrando sesión");
                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("user");
                setUser(null);
            }
        };

        return navigationRef.addListener("state", validateToken);
    }, [navigationRef]);

    const handleLogin = async (user, password) => {
        if (!user || !password) {
            getError("Todos los campos son obligatorios");
            return;
        }
        try {
            const response = await login(user, password);
            if (response.status === 200 && response.data.user) {
                setUser(response.data.user);
                await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
                await AsyncStorage.setItem("token", response.data.token);
                getSuccess("Inicio de sesión exitoso");
            }
        } catch (error) {
            setUser(null);
            await AsyncStorage.removeItem("user");
            getError("Usuario o contraseña incorrectos");

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
            await updateUser(user);
            setUser(user);
            await AsyncStorage.setItem("user", JSON.stringify(user));
            return true;
        } catch (error) {
            console.error("Error updating profile", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, updateProfile }}>
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