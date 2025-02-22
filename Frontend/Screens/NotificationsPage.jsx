import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const NotificationsPage = () => {
  const navigation = useNavigation();

  const notifications = [
    { id: '246568', date: '2025-01-30 11:30:56', device: 'D4 - CC11', sensor: 'Temperatura', details: 'Ver más' },
    { id: '246568', date: '2025-01-30 11:30:56', device: 'D4 - CC11', sensor: 'Humedad', details: 'Ver más' },
    { id: '246568', date: '2025-01-30 11:30:56', device: 'D4 - CC11', sensor: 'CO2', details: 'Ver más' },
    { id: '246568', date: '2025-01-30 11:30:56', device: 'D4 - CC11', sensor: 'Ruido', details: 'Ver más' },
    { id: '246569', date: '2025-01-30 11:30:56', device: 'D4 - CC12', sensor: 'Temperatura', details: 'Ver más' },
    { id: '246569', date: '2025-01-30 11:30:56', device: 'D4 - CC12', sensor: 'Humedad', details: 'Ver más' },
    { id: '246569', date: '2025-01-30 11:30:56', device: 'D4 - CC12', sensor: 'CO2', details: 'Ver más' },
    { id: '246569', date: '2025-01-30 11:30:56', device: 'D4 - CC12', sensor: 'Ruido', details: 'Ver más' },
    { id: '246570', date: '2025-01-30 11:30:56', device: 'D4 - CC13', sensor: 'Temperatura', details: 'Ver más' },
  ];

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      {/* Fondo */}
      <Image
        source={require("../assets/fondo.jpg")}
        style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.3 }}
        resizeMode="cover"
      />

      {/* Encabezado con logo */}
      <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#D9D9D9' }}>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 60, height: 60 }}
          resizeMode="contain"
        />
      </View>

      {/* Contenido de notificaciones */}
      <ScrollView style={{ flex: 1, padding: 16 }}>
        {notifications.map((notification, index) => (
          <View key={index} style={{ marginBottom: 16, padding: 16, backgroundColor: 'white', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
            <Text style={{ fontSize: 14, color: '#666' }}>{notification.date}</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>{notification.device}</Text>
            <Text style={{ fontSize: 16, color: '#333', marginTop: 4 }}>{notification.sensor}</Text>
            <TouchableOpacity
              style={{ marginTop: 8 }}
              onPress={() => navigation.navigate("NotificationDetails", { notification })}
            >
              <Text style={{ color: '#DEFF35', fontWeight: 'bold', fontSize: 16 }}>{notification.details}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <StatusBar style="dark" />
    </View>
  );
};

export default NotificationsPage;