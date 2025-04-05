import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { fileNotification, getNotification } from "../api/notifications.api";
import { useNotification } from "../context/NotificationContext";
import Header from "../components/Header";
import { getBuilding } from "../api/buildings.api";
import { getSpace } from "../api/spaces.api";
import { getDevice } from "../api/devices.api";

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
        
        // 1. Obtener la notificación
        console.log("Obteniendo notificación con ID:", id);
        const notificationResponse = await getNotification(id);
        const notificationData = notificationResponse.data;
        console.log("Datos de notificación:", notificationData);
        setNotification(notificationData);
        
        // 2. Obtener building
        const buildingId = extractId(notificationData.building);
        console.log("Building ID:", buildingId);
        if (buildingId) {
          try {
            const buildingResponse = await getBuilding(buildingId);
            console.log("Respuesta de edificio:", buildingResponse.data);
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
        console.log("Space ID:", spaceId);
        if (buildingId && spaceId) {
          try {
            console.log(`Llamando a getSpace con buildingId: ${buildingId} y spaceId: ${spaceId}`);
            const spaceResponse = await getSpace(buildingId, spaceId);
            console.log("Respuesta de espacio:", spaceResponse);
            
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
        console.log("Device ID:", deviceId);
        if (deviceId) {
          try {
            console.log(`Llamando a getDevice con deviceId: ${deviceId}`);
            const deviceResponse = await getDevice(deviceId);
            console.log("Respuesta de dispositivo:", deviceResponse);
            
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
  
  if (loading || !notification) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Cargando notificación...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Main title */}
        <Text style={styles.title}>{notification.sensor}</Text>
        
        {/* Info cards */}
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Icon name="hardware-chip" size={20} color="#666" style={styles.icon} />
            <View>
              <Text style={styles.label}>Dispositivo</Text>
              <Text style={styles.value}>{device.name}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Icon name="document-text" size={20} color="#666" style={styles.icon} />
            <View>
              <Text style={styles.label}>Nombre</Text>
              <Text style={styles.value}>{notification.name}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Icon name="business" size={20} color="#666" style={styles.icon} />
            <View>
              <Text style={styles.label}>Edificio</Text>
              <Text style={styles.value}>{building.name}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Icon name="home" size={20} color="#666" style={styles.icon} />
            <View>
              <Text style={styles.label}>Aula</Text>
              <Text style={styles.value}>{space.name}</Text>
            </View>
          </View>
        </View>
        
        {/* Sensor data card */}
        <View style={[styles.card, styles.sensorCard]}>
          <Text style={styles.sensorTitle}>Datos del sensor</Text>
          
          <View style={styles.sensorDataRow}>
            <View>
              <Text style={styles.label}>Valor medido</Text>
              <Text style={[styles.value, styles.sensorValue]}>{getFormattedValue()}</Text>
            </View>
            
            <View style={styles.dateContainer}>
              <Text style={styles.label}>Fecha</Text>
              <Text style={styles.value}>{getDate()}</Text>
            </View>
          </View>
          
          {notification.image && (
            <View style={styles.imageContainer}>
              <Image 
                source={{ 
                  uri: notification.image.startsWith('data:image') 
                    ? notification.image 
                    : `data:image/jpeg;base64,${notification.image}`
                }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
        
        {/* Resolve button */}
        {notification.status && (
          <TouchableOpacity 
            style={styles.resolveButton}
            onPress={handleFileNotification}
          >
            <Text style={styles.resolveButtonText}>Marcar como resuelta</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

// Estilos (se mantienen igual que en tu código original)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
    fontSize: 16,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    marginLeft: 8,
    color: '#4A90E2',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sensorCard: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  label: {
    color: '#666',
    fontSize: 14,
    marginBottom: 2,
  },
  value: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12,
  },
  sensorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  sensorDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sensorValue: {
    fontSize: 18,
    color: '#4A90E2',
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  imageContainer: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#EEE',
  },
  image: {
    width: '100%',
    height: 250,
  },
  resolveButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  resolveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectedNotificationScreen;