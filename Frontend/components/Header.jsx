import { Image, Platform, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header = ({ navigation }) => {
    const { user, handleLogout } = useContext(AuthContext);
    const route = useRoute();
    const insets = useSafeAreaInsets();

    const isLoginPage = route.name === "Login";
    const isProfilePage = route.name === "Profile";

    const logout = async () => {
        try {
            await handleLogout();
        } catch (error) {
            console.error("Error al cerrar sesión");
        }
    };

    return (
        <View
            className="bg-header flex-row items-center justify-between px-4"
            style={{
                paddingTop: insets.top + 10,
                ...Platform.select({
                    ios: {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                    },
                    android: {
                        elevation: 5,
                    },
                }),
            }}
        >
            <Image
                source={require("../assets/logo.png")}
                className="w-32 h-10 ml-4 mb-2"
            />

            {user && !isProfilePage && (
                <TouchableOpacity
                    className="bg-[rgba(222,255,53,0.8)] w-10 h-10 justify-center items-center rounded-full mr-4 mb-2 border border-action-hover"
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Text className="text-black text-lg font-bold">
                        {user.name.charAt(0).toUpperCase()}
                    </Text>
                </TouchableOpacity>
            )}

            {!isLoginPage && !user && (
                <TouchableOpacity
                    className="bg-action-primary rounded-lg px-4 border border-action-hover justify-center"
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text className="text-primary text-center py-[7px]">Iniciar sesión</Text>
                </TouchableOpacity>
            )}

            {isProfilePage && user && (
                <TouchableOpacity
                    className="bg-action-primary rounded-lg px-4 border border-action-hover justify-center py-1.5 mr-4 mb-2"
                    onPress={logout}
                >
                    <Text className="text-primary text-center">Cerrar sesión</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Header;