import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import { getUnfiledNotifications, getFiledNotifications } from "../api/notifications.api";
import { useNotification } from "../context/NotificationContext";

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const { getError } = useNotification();
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFiled, setShowFiled] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = showFiled 
          ? await getFiledNotifications() 
          : await getUnfiledNotifications();

        const formattedData = response.data.map(notification => ({
          fecha: new Date(notification.date).toLocaleDateString("es-MX", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          dispositivo: `#${notification.device}`,
          nombre: notification.name,
          sensor: notification.sensor,
          _id: notification._id,
          ...notification // Mantener los datos originales también
        }));

        setNotifications(formattedData);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
        getError("Error al obtener las notificaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [showFiled]);

  const filteredNotifications = notifications.filter(notification =>
    notification.nombre.toLowerCase().includes(search.toLowerCase()) ||
    notification.dispositivo.toLowerCase().includes(search.toLowerCase()) ||
    notification.sensor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 relative">
      <Image
        source={require("../assets/bg.png")}
        className="absolute top-0 left-0 w-fill h-full"
        style={{ width: "600%", height: "100%" }}
        resizeMode="cover"
      />

      <Header navigation={navigation} />

      <View className="p-4">
        <View className="flex-row items-center ml-2.5 mb-6">
          <Icon className="mr-2" name="home" size={25} color="#000" />
          <Icon className="mr-2" name="chevron-forward-sharp" size={25} color="#000" />
          <Text className="text-xl">Notificaciones {showFiled ? "archivadas" : ""}</Text>
        </View>
      </View>

      <View className="px-4 flex-row justify-between items-center mb-4">
        {/* Barra de búsqueda */}
        <View className="bg-white flex-1 rounded-lg shadow-sm shadow-black flex-row items-center px-3 mr-2">
          <Icon name="search" size={20} color="#777" />
          <TextInput
            className="flex-1 py-2 px-2"
            placeholder="Buscar notificaciones..."
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Icon name="close-circle" size={20} color="#777" />
            </TouchableOpacity>
          )}
        </View>

        {/* Toggle para mostrar archivadas/no archivadas */}
        <TouchableOpacity
          className="bg-white rounded-full p-2 shadow-sm shadow-black"
          onPress={() => setShowFiled(!showFiled)}
        >
          <Icon 
            name={showFiled ? "archive" : "mail"} 
            size={24} 
            color={showFiled ? "#000" : "#000"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="px-4">
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : filteredNotifications.length === 0 ? (
            <Text className="text-center text-gray-500">No hay notificaciones{search ? " que coincidan con la búsqueda" : ""}</Text>
          ) : (
            filteredNotifications.map((notification) => (
              <TouchableOpacity 
                key={notification._id} 
                onPress={() => navigation.navigate("SelectedNotification", { id: notification._id })}
              >
                <View className="mb-4 p-4 bg-white rounded-lg shadow-sm shadow-black">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-lg font-bold text-gray-800">{notification.sensor}</Text>
                  </View>
                  <Text className="text-base text-gray-600">{notification.nombre}</Text>
                  <View className="flex-row justify-between items-center mt-2">
                    <Text className="text-sm text-gray-500">Dispositivo: {notification.dispositivo}</Text>
                    <Text className="text-sm text-gray-500">{notification.fecha}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      <StatusBar style="dark" />
    </View>
  );
};

export default NotificationsScreen;