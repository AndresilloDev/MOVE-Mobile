import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { fileNotification, getNotification } from "../api/notifications.api";
import { useNotification } from "../context/NotificationContext";
import Header from "../components/Header";

const SelectedNotificationScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  
  const [notification, setNotification] = useState(null);
  const { getError, getSuccess } = useNotification();
  
  const navigation = useNavigation();
  
  const getFormattedValue = () => {
    if (notification.value) {
      switch (notification.sensor) {
        case "Temperatura":
          return `${notification.value} °C`;
        case "Humedad":
          return `${notification.value} %`;
        case "Luz":
          return `${notification.value} Lux`;
        case "Sonido":
          return `${notification.value} dB`;
        case "CO2":
          return `${notification.value} ppm`;
      }
    }
    return "Sin datos";
  };
  
  const getDate = () => {
    return new Date(notification.date).toISOString().replace("T", " ").substring(0, 19);
  };
  
  const handleFileNotification = async () => {
    try {
      const response = await fileNotification(id);
      if (response.status === 200) {
        getSuccess("Notificación resuelta correctamente");
        setNotification({ ...notification, status: false });
        navigation.navigate("Notifications");
      } else {
        getError("Error al resolver la notificación");
      }
    } catch (error) {
      console.error("Error resolving notification:", error);
      getError("Error al resolver la notificación");
    }
  };
  
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await getNotification(id);
        setNotification(response.data);
      } catch (error) {
        console.error("Error fetching notification:", error);
        getError("Error al obtener la notificación");
      }
    };
    fetchNotification();
  }, []);
  
  if (!notification) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
  
  return (
    <View className="flex-1">
      <Image
        source={require("../assets/bg.png")}
        className="absolute top-0 left-0 w-fill h-full"
        style={{ width: "600%", height: "100%" }}
        resizeMode="cover"
      />
      
      <Header navigation={navigation} />
      
      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="flex-row items-center ml-2.5 mb-6">
            <Icon className="mr-2" name="home" size={25} color="#000" />
            <Icon className="mr-2" name="chevron-forward-sharp" size={25} color="#000" />
            <Text className="mr-2 text-xl">Notificaciones</Text>
            <Icon className="mr-2" name="chevron-forward-sharp" size={25} color="#000" />
            <Text className="text-xl">{notification?.sensor}</Text>
          </View>
        </View>
        
        <View className="px-4">
          <View className="mb-4 p-4 bg-white rounded-lg shadow-sm shadow-black flex-row justify-between">
            <View>
              <Text className="text-lg font-bold text-gray-800">Dispositivo:
                <Text className="text-lg font-normal text-gray-800"> {notification?.device.name}</Text>
              </Text>
              <Text className="text-lg font-bold text-gray-800">Nombre:
                <Text className="text-lg font-normal text-gray-800"> {notification?.name}</Text>
              </Text>
            </View>
            <View className="flex-col items-end">
              <Text className="text-lg font-bold text-gray-800">Aula:
                <Text className="text-lg font-normal text-gray-800"> {notification.space}</Text>
              </Text>
              <Text className="text-lg font-bold text-gray-800">Edificio:
                <Text className="text-lg font-normal text-gray-800"> {notification.building}</Text>
              </Text>
            </View>
          </View>
        </View>
        
        <View className="px-4">
          <View className="mb-4 p-4 bg-white rounded-lg shadow-sm shadow-black flex-col items-center">
            <View className="flex-row justify-between w-full">
              <View className="flex-col items-start">
                <Text className="text-lg font-bold text-gray-800">Temperatura alcanzada:</Text>
                <Text className="text-lg font-normal text-gray-800">{getFormattedValue()}</Text>
              </View>
              <View className="flex-col items-end">
                <Text className="text-lg font-bold text-gray-800">Fecha:</Text>
                <Text className="text-lg font-normal text-gray-800">{getDate()}</Text>
              </View>
            </View>
            <View className="p-1">
              {/* Como ejemplo usamos un ícono en lugar de la imagen externa */}
              <Icon name="image-outline" size={300} color="#000" />
              {/* Alternativamente, si deseas usar la imagen de una URL (requiere configuración adicional):
              <Image
                source={{ uri: "https://cdn.milenio.com/uploads/media/2020/01/28/arribar-encontraron-danos-considerables-salon.jpeg" }}
                className="w-full h-64"
                resizeMode="contain"
              /> */}
            </View>
          </View>
        </View>
        
        {notification.status && (
          <TouchableOpacity 
            className="bg-[rgba(222,255,53,0.8)] border border-black rounded-xl w-2/5 py-2 self-center mb-4"
            onPress={handleFileNotification}
          >
            <Text className="font-bold text-lg text-center">Notificación Resuelta</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default SelectedNotificationScreen;