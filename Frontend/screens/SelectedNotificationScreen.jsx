import React, {useCallback, useEffect, useState} from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import {useRoute, useNavigation, useFocusEffect} from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { fileNotification, getNotification } from "../api/notifications.api";
import { useNotification } from "../context/NotificationContext";
import Header from "../components/Header";
import { getBuilding } from "../api/buildings.api";
import { getSpace } from "../api/spaces.api";
import { getDevice } from "../api/devices.api";
import Loader from "../components/Loader";

const SelectedNotificationScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  
  const [notification, setNotification] = useState(null);
  const [building, setBuilding] = useState({ name: "Cargando..." });
  const [space, setSpace] = useState({ name: "Cargando..." });
  const [device, setDevice] = useState({ name: "Cargando..." });
  const [loading, setLoading] = useState(true);
  const { getError, getSuccess } = useNotification();
  
  const navigation = useNavigation();

  // Función mejorada para extraer IDs
  const extractId = (id) => {
    if (!id) return null;
    if (typeof id === 'object' && id.$oid) return id.$oid;
    if (typeof id === 'object' && id._id) return id._id;
    return id.toString(); // Asegurar que siempre sea string
  };

  const getFormattedValue = () => {
    if (notification?.value) {
      const value = parseFloat(notification.value);
      switch (notification.sensor.toLowerCase()) {
        case "temperatura":
          return `${value} °C`;
        case "humedad":
          return `${value} %`;
        case "luz":
          return `${value} Lux`;
        case "sonido":
          return `${value} dB`;
        case "dióxido de carbono":
        case "co2":
          return `${value} ppm`;
        default:
          return "Sin datos";
      }
    }
    return "Sin datos";
  };
  
  const getDate = () => {
    if (!notification?.date) return "Cargando...";
    const date = new Date(notification.date);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleFileNotification = async () => {
    try {
      const response = await fileNotification(id);
      if (response.status === 200) {
        getSuccess("Notificación resuelta correctamente");
        setNotification(prev => ({ ...prev, status: false }));
        navigation.goBack();
      } else {
        getError("Error al resolver la notificación");
      }
    } catch (error) {
      console.error("Error resolving notification:", error);
      getError("Error al resolver la notificación");
    }
  };
  
  useEffect(() => {
    const fetchNotificationDetails = async () => {
      try {
        setLoading(true);
        
        const notificationResponse = await getNotification(id);
        const notificationData = notificationResponse.data;
        setNotification(notificationData);
        
        // 2. Obtener building
        const buildingId = extractId(notificationData.building);
        if (buildingId) {
          try {
            const buildingResponse = await getBuilding(buildingId);
            setBuilding(buildingResponse.data || { name: "Desconocido" });
          } catch (error) {
            console.error("Error al obtener edificio:", error);
            setBuilding({ name: "Desconocido" });
          }
        } else {
          setBuilding({ name: "No especificado" });
        }
        
        // 3. Obtener space
        const spaceId = extractId(notificationData.space);
        if (buildingId && spaceId) {
          try {
            const spaceResponse = await getSpace(buildingId, spaceId);
            // Manejar diferentes estructuras de respuesta
            const spaceData = spaceResponse.data || spaceResponse;
            if (spaceData && typeof spaceData === 'object') {
              setSpace(spaceData.name ? spaceData : { name: spaceData });
            } else {
              setSpace({ name: "Desconocido" });
            }
          } catch (error) {
            console.error("Error al obtener espacio:", error);
            setSpace({ name: "Desconocido" });
          }
        } else {
          setSpace({ name: "No especificado" });
        }
        
        // 4. Obtener device
        const deviceId = extractId(notificationData.device);
        if (deviceId) {
          try {
            const deviceResponse = await getDevice(deviceId);
            // Manejar diferentes estructuras de respuesta
            const deviceData = deviceResponse.data || deviceResponse;
            if (deviceData && typeof deviceData === 'object') {
              setDevice(deviceData.name ? deviceData : { name: deviceData });
            } else {
              setDevice({ name: "Desconocido" });
            }
          } catch (error) {
            console.error("Error al obtener dispositivo:", error);
            setDevice({ name: "Desconocido" });
          }
        } else {
          setDevice({ name: "No especificado" });
        }
        
      } catch (error) {
        console.error("Error general al cargar datos:", error);
        getError("Error al cargar los detalles de la notificación");
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationDetails();
  }, [id]);

  return (
      <View className="flex-1 bg-gray-100">
        <Image
            source={require("../assets/bg.png")}
            className="absolute top-0 left-0 w-full h-full"
            style={{ width: "600%", height: "100%" }}
            resizeMode="cover"
        />

        <Header navigation={navigation} />

        {(loading || !notification) ? (
            <Loader />
        ) : (
            <>

        {/* Breadcrumb Navigation */}
        <View className="m-4 ml-6 flex-row items-center">
          <Icon name="home" size={25} color="#000" className="mr-2" />
          <Icon name="chevron-forward-sharp" size={25} color="#000" className="mr-2" />
          <Text className="text-xl">{notification.sensor}</Text>
        </View>



        <ScrollView className="px-4 pb-8">

          {/* Info cards */}
          <View className="bg-white rounded-xl p-4 shadow-lg mb-6">
            <View className="flex-row space-x-4 my-3">
              {/* Primera sección: alineada a la izquierda y centrada */}
              <View className="flex-1 justify-center items-center">
                <View className="flex-row items-center mb-3">
                  <Icon name="hardware-chip" size={20} color="#666" className="mr-3" />
                  <View>
                    <Text className="text-sm text-gray-600 mb-1">Dispositivo</Text>
                    <Text className="text-base font-medium text-gray-800">{device.name}</Text>
                  </View>
                </View>

                <View className="flex-row items-center mb-3">
                  <Icon name="document-text" size={20} color="#666" className="mr-3" />
                  <View>
                    <Text className="text-sm text-gray-600 mb-1">Nombre</Text>
                    <Text className="text-base font-medium text-gray-800">{notification.name}</Text>
                  </View>
                </View>
              </View>

              <View className="w-px bg-gray-300 mx-3" />

              {/* Segunda sección: alineada a la derecha y centrada */}
              <View className="flex-1 justify-center items-center">
                <View className="flex-row items-center mb-3">
                  <Icon name="business" size={20} color="#666" className="mr-3" />
                  <View>
                    <Text className="text-sm text-gray-600 mb-1">Edificio</Text>
                    <Text className="text-base font-medium text-gray-800">{building.name}</Text>
                  </View>
                </View>

                <View className="flex-row items-center mb-3">
                  <Icon name="home" size={20} color="#666" className="mr-3" />
                  <View>
                    <Text className="text-sm text-gray-600 mb-1">Aula</Text>
                    <Text className="text-base font-medium text-gray-800">{space.name}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>


          {/* Sensor data card */}
          <View className="bg-white rounded-xl p-4 shadow-lg mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Datos del sensor</Text>

            <View className="flex-row justify-between mb-4">
              <View>
                <Text className="text-sm text-gray-600 mb-1">Valor medido</Text>
                <Text className="text-base font-medium text-blue-600">{getFormattedValue()}</Text>
              </View>

              <View className="items-end">
                <Text className="text-sm text-gray-600 mb-1">Fecha</Text>
                <Text className="text-base font-medium text-gray-800">{getDate()}</Text>
              </View>
            </View>

            {notification.image && (
                <View className="mt-4 rounded-lg overflow-hidden bg-gray-200">
                  <Image
                      source={{
                        uri: notification.image.startsWith('data:image')
                            ? notification.image
                            : `data:image/jpeg;base64,${notification.image}`
                      }}
                      className="w-full h-64"
                      resizeMode="contain"
                  />
                </View>
            )}
          </View>

          {/* Resolve button */}
          {notification.status && (
              <TouchableOpacity
                  className="bg-action-primary py-3 rounded-xl flex-[1.2] items-center border border-action-hover"
                  onPress={handleFileNotification}
              >
                <Text className="text-primary text-lg text-center font-semibold">Marcar como resuelta</Text>
              </TouchableOpacity>
          )}
        </ScrollView>
            </>

            )}
      </View>
  );
};

export default SelectedNotificationScreen;