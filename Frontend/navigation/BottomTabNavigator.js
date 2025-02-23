import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNavigatorBuildings from "./StackNavigatorBuildings";
import AdminsScreen from "../screens/AdminsScreen";
import StackNavigatorNotifications from "./StackNavigatorNotifications";
import StackNavigatorDevices from "./StackNavigatorDevices";
import { Image, SafeAreaView, Text, View } from "react-native";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={ ({ route }) => ({
                header: () => (
                    <SafeAreaView className="bg-white">
                        <View className="h-14 bg-white flex justify-end items-center shadow-md">
                            <Image
                                source={require("../assets/logo.png")}
                                className="w-32 h-12"
                            />
                        </View>
                    </SafeAreaView>
                ),
                tabBarStyle: { height: 60 },
                tabBarLabelStyle: { fontSize: 12 },
            })}
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
              component={AdminsScreen} 
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
