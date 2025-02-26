import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";

const NotificationsScreen = () => {
  const navigation = useNavigation();

  const notifications = [
    { id: '246568', date: '2025-01-30 11:30:56', device: 'D4 - CC11', sensor: 'Temperatura', message: 'La temperatura ha superado el límite permitido.' },
    { id: '246568', date: '2025-01-30 11:30:56', device: 'D4 - CC11', sensor: 'Humedad', message: 'La humedad ha bajado del nivel recomendado.' },
    { id: '246568', date: '2025-01-30 11:30:56', device: 'D4 - CC11', sensor: 'CO2', message: 'Niveles de CO2 más altos de lo normal.' },
    { id: '246568', date: '2025-01-30 11:30:56', device: 'D4 - CC11', sensor: 'Ruido', message: 'El nivel de ruido ha excedido el límite permitido.' }
  ];

  return (
    <View className="flex-1 relative">

        <Image
            source={require("../assets/bg.png")} 
            className="absolute top-0 left-0 w-fill h-full" 
            style={{ width: "600%", height: "100%"}}
            resizeMode="cover" 
      	/>

        <Header navigation={navigation} />

      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="flex-row items-center ml-2.5 mb-6">
              <Icon className="mr-2" name="home" size={25} color="#000" />
              <Icon className="mr-2" name="chevron-forward-sharp" size={25} color="#000" />
            <Text className="text-xl">Notificaciones</Text>
          </View>
        </View>

        <View className="px-4">
          {notifications.map((notification, index) => (
              <TouchableOpacity onPress={() => navigation.navigate("SelectedNotification")}>
            <View
              key={index}
              className="mb-4 p-4 bg-white rounded-lg shadow-sm shadow-black"
            >
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-bold text-gray-800">{notification.sensor}</Text>
              </View>

              <Text className="text-base text-gray-600">{notification.message}</Text>

              <View className="flex-row justify-between items-center mt-2">
                <Text className="text-sm text-gray-500">Dispositivo: {notification.device}</Text>
                <Text className="text-sm text-gray-500">{notification.date}</Text>
              </View>
            </View>
              </TouchableOpacity>

          ))}
        </View>

      </ScrollView>

      <TouchableOpacity 
        className="absolute bottom-5 right-5 bg-[rgba(222,255,53,0.8)] w-12 h-12 rounded-full items-center justify-center shadow-sm shadow-black" 
        onPress={() => navigation.navigate("ArchivedNotifications")} 
      >
        <Icon name="archive" size={30} color="#000" />
      </TouchableOpacity>

      <StatusBar style="dark" />
    </View>
  );
};

export default NotificationsScreen;