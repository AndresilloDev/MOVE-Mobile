import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNavigatorBuildings from "./StackNavigatorBuildings";
import StackNavigatorNotifications from "./StackNavigatorNotifications";
import StackNavigatorDevices from "./StackNavigatorDevices";
import StackNavigatorUsers from "./StackNavigatorUsers";
import { Image, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Estás seguro que deseas cerrar sesión?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Cerrar sesión", onPress: () => logout() },
            ]
        );
    };

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Devices"
                component={StackNavigatorDevices}
                options={{
                    tabBarIcon: () => (
                        <Image source={require("../assets/icons/devices.png")} className="w-8 h-8" />
                    ),
                }}
            />
            <Tab.Screen
                name="Buildings"
                component={StackNavigatorBuildings}
                options={{
                    tabBarIcon: () => (
                        <Image source={require("../assets/icons/edificio.png")} className="w-8 h-8" />
                    ),
                }}
            />
            { user?.isSuperAdmin && (
                <Tab.Screen
                    name="Admins"
                    component={StackNavigatorUsers}
                    options={{
                        tabBarIcon: () => (
                            <Image source={require("../assets/icons/personas.png")} className="w-8 h-8" />
                        ),
                    }}
                />
            )}
            <Tab.Screen
                name="Notifications"
                component={StackNavigatorNotifications}
                options={{
                    tabBarIcon: () => (
                        <Image source={require("../assets/icons/notificacion.png")} className="w-8 h-8" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
