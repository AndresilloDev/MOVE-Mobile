import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNavigatorBuildings from "./StackNavigatorBuildings";
import AdminsScreen from "../screens/AdminsScreen";
import StackNavigatorNotifications from "./StackNavigatorNotifications";
import StackNavigatorDevices from "./StackNavigatorDevices";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UsersScreen from "../screens/UsersScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({}) {
  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro que deseas cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Cerrar sesión", onPress: () => console.log("Cerrar sesión") },
      ]
    );
  };

    return (
        <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        >
            <Tab.Screen 
              name="Devices" 
              component={StackNavigatorDevices}
              options={{
                tabBarIcon: () => (
                    <Image
                      source={require("../assets/icons/devices.png")}
                      className="w-8 h-8"
                  />
                ),
              }} />
            <Tab.Screen 
              name="Buildings" 
              component={StackNavigatorBuildings} 
              options={{
                tabBarIcon: () => (
                    <Image
                        source={require("../assets/icons/edificio.png")}
                        className="w-8 h-8"
                    />
                ),
              }} />
            <Tab.Screen 
              name="Admins" 
              component={UsersScreen} 
              options={{
                tabBarIcon: () => (
                    <Image
                        source={require("../assets/icons/personas.png")}
                        className="w-8 h-8"
                    />
                ),
              }} />
            <Tab.Screen
                name="Notifications"
                component={StackNavigatorNotifications}
                options={{
                  tabBarIcon: () => (
                      <Image
                          source={require("../assets/icons/notificacion.png")}
                          className="w-8 h-8"
                      />
                  ),
                }} />
        </Tab.Navigator>
    );
}
