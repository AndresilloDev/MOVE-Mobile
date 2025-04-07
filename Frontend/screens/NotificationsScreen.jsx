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
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
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
          ...notification
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
    <View style={styles.container}>
      <LinearGradient
        colors={['#f7f7f7', '#e1e8f0']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Header navigation={navigation} />

        <View style={styles.contentContainer}>
          {/* Breadcrumb and Title */}
          <View style={styles.header}>
            <View style={styles.breadcrumb}>
              <Icon name="home" size={20} color="#4a5568" />
              <Icon name="chevron-forward" size={20} color="#4a5568" style={styles.chevron} />
              <Text style={styles.title}>
                Notificaciones {showFiled ? "archivadas" : ""}
              </Text>
            </View>
          </View>

          {/* Search and Toggle */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Icon name="search" size={18} color="#718096" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar notificaciones..."
                placeholderTextColor="#a0aec0"
                value={search}
                onChangeText={setSearch}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch("")} style={styles.clearButton}>
                  <Icon name="close-circle" size={18} color="#a0aec0" />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setShowFiled(!showFiled)}
              activeOpacity={0.7}
            >
              <Icon 
                name={showFiled ? "archive" : "mail-open"} 
                size={22} 
                color={showFiled ? "#4a5568" : "#4a5568"}
              />
            </TouchableOpacity>
          </View>

          {/* Notifications List */}
          <ScrollView style={styles.scrollContainer}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4c51bf" />
              </View>
            ) : filteredNotifications.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Icon name="notifications-off" size={40} color="#cbd5e0" />
                <Text style={styles.emptyText}>
                  No hay notificaciones{search ? " que coincidan con la búsqueda" : ""}
                </Text>
              </View>
            ) : (
              filteredNotifications.map((notification) => (
                <TouchableOpacity 
                  key={notification._id} 
                  onPress={() => navigation.navigate("SelectedNotification", { id: notification._id })}
                  activeOpacity={0.8}
                >
                  <View style={styles.notificationCard}>
                    <View style={styles.notificationHeader}>
                      <Text style={styles.sensorText}>{notification.sensor}</Text>
                      <View style={styles.dateBadge}>
                        <Text style={styles.dateText}>{notification.fecha}</Text>
                      </View>
                    </View>
                    <Text style={styles.nameText}>{notification.nombre}</Text>
                    <View style={styles.footer}>
                      <View style={styles.deviceBadge}>
                        <Icon name="hardware-chip" size={14} color="#718096" />
                        <Text style={styles.deviceText}>{notification.dispositivo}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>

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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    marginBottom: 20,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  chevron: {
    marginHorizontal: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2d3748',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2d3748',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  toggleButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#a0aec0',
    marginTop: 16,
    textAlign: 'center',
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sensorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
  },
  dateBadge: {
    backgroundColor: '#edf2f7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#4a5568',
    fontWeight: '500',
  },
  nameText: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deviceText: {
    fontSize: 12,
    color: '#718096',
    marginLeft: 4,
  },
});

export default NotificationsScreen;