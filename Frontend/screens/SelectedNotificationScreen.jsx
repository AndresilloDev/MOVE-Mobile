import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import { CheckCircle, AlertTriangle, Clock } from "lucide-react-native";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import { getNotification, fileNotification } from "../api/notifications.api";
import { getBuilding } from "../api/buildings.api";
import { getSpace } from "../api/spaces.api";
import { useNotification } from "../context/NotificationContext";

const SelectedNotificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const { getError, getSuccess } = useNotification();
  const [notification, setNotification] = useState(null);
  const [buildingName, setBuildingName] = useState("Cargando...");
  const [spaceName, setSpaceName] = useState("Cargando...");
  const [loading, setLoading] = useState(true);

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
        case "dioxido de carbono":
          return `${value} ppm`;
        default:
          return value;
      }
    }
    return "Sin datos";
  };

  const getFormattedDate = () => {
    if (!notification?.date) return "Fecha no disponible";
    const date = new Date(notification.date);
    return date.toLocaleString("es-MX", {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleFileNotification = async () => {
    try {
      const response = await fileNotification(id);
      if (response.status === 200) {
        getSuccess("Notificación resuelta correctamente");
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
        setLoading(true);
        const response = await getNotification(id);
        setNotification(response.data);
        
        try {
          const buildingResponse = await getBuilding(response.data.building);
          setBuildingName(buildingResponse.data.name);
        } catch (error) {
          setBuildingName("Edificio no encontrado");
        }

        try {
          const spaceResponse = await getSpace(response.data.building, response.data.space);
          setSpaceName(spaceResponse.data.name);
        } catch (error) {
          setSpaceName("Espacio no encontrado");
        }
      } catch (error) {
        getError("Error al cargar la notificación");
        navigation.navigate("Notifications");
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotification();
  }, [id]);

  if (loading || !notification) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4c51bf" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f7f7f7', '#e1e8f0']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Header navigation={navigation} />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
              <Text style={styles.notificationTitle}>{notification.name}</Text>
              <View style={styles.statusContainer}>
                {notification.status ? (
                  <AlertTriangle size={20} color="#f59e0b" style={styles.statusIcon} />
                ) : (
                  <CheckCircle size={20} color="#10b981" style={styles.statusIcon} />
                )}
                <Text style={[
                  styles.statusText,
                  notification.status ? styles.statusPending : styles.statusResolved
                ]}>
                  {notification.status ? "Pendiente" : "Resuelta"}
                </Text>
              </View>
            </View>
            <View style={styles.dateContainer}>
              <Clock size={20} color="#4b5563" style={styles.dateIcon} />
              <Text style={styles.dateText}>{getFormattedDate()}</Text>
            </View>
          </View>

          {/* Image Section */}
          <View style={styles.imageContainer}>
            {notification.image ? (
              <Image
                source={{
                  uri: notification.image.startsWith('data:image') 
                    ? notification.image 
                    : `data:image/jpeg;base64,${notification.image}`
                }}
                style={styles.notificationImage}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.noImageContainer}>
                <Icon name="image-outline" size={40} color="#9ca3af" />
                <Text style={styles.noImageText}>No hay imagen disponible</Text>
              </View>
            )}
          </View>

          {/* Device Information Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="hardware-chip-outline" size={20} color="#3b82f6" />
              <Text style={styles.cardTitle}>Información del Dispositivo</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nombre:</Text>
                <Text style={styles.infoValue}>{notification.device?.name || "No disponible"}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>ID:</Text>
                <Text style={styles.infoValue}>{notification.device?._id || "No disponible"}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Sensor:</Text>
                <Text style={[styles.infoValue, { textTransform: 'capitalize' }]}>
                  {notification.sensor || "No disponible"}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Valor:</Text>
                <Text style={[styles.infoValue, styles.valueText]}>
                  {getFormattedValue()}
                </Text>
              </View>
            </View>
          </View>

          {/* Location Information Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="location-outline" size={20} color="#3b82f6" />
              <Text style={styles.cardTitle}>Ubicación</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Edificio:</Text>
                <Text style={styles.infoValue}>{buildingName}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Aula:</Text>
                <Text style={styles.infoValue}>CC10</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Fecha:</Text>
                <Text style={styles.infoValue}>{getFormattedDate()}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Estado:</Text>
                <Text style={[
                  styles.infoValue,
                  notification.status ? styles.statusPending : styles.statusResolved
                ]}>
                  {notification.status ? 'Pendiente' : 'Resuelta'}
                </Text>
              </View>
            </View>
          </View>

          {/* Action Button */}
          {notification.status && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleFileNotification}
              activeOpacity={0.8}
            >
              <CheckCircle size={20} color="#10b981" />
              <Text style={styles.actionButtonText}>Marcar como resuelta</Text>
            </TouchableOpacity>
          )}

          <View style={styles.spacer} />
        </ScrollView>

        <StatusBar style="dark" />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerContainer: {
    backgroundColor: '#4b5563',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 20,
  },
  headerContent: {
    marginBottom: 12,
  },
  notificationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
  },
  statusPending: {
    color: '#f59e0b',
  },
  statusResolved: {
    color: '#10b981',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    marginRight: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#e5e7eb',
  },
  imageContainer: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  notificationImage: {
    width: '100%',
    height: '100%',
  },
  noImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    marginTop: 8,
    color: '#9ca3af',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
  },
  cardContent: {
    paddingHorizontal: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '400',
    flexShrink: 1,
    marginLeft: 8,
    textAlign: 'right',
  },
  valueText: {
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  actionButtonText: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  spacer: {
    height: 40,
  },
});

export default SelectedNotificationScreen;