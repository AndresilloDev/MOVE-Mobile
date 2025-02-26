import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";

const ArchivedNotifications = ({}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);

  const archivedNotifications = [
    { id: '246568', date: '2025-01-30 11:30:56', device: 'D4 - CC11', sensor: 'Temperatura', message: 'La temperatura ha superado el límite permitido.' },
    { id: '246568', date: '2025-01-30 11:30:56', device: 'D4 - CC11', sensor: 'Humedad', message: 'La humedad ha bajado del nivel recomendado.' },
    { id: '246568', date: '2025-01-30 11:30:56', device: 'D4 - CC11', sensor: 'CO2', message: 'Niveles de CO2 más altos de lo normal.' },
    { id: '246568', date: '2025-01-30 11:30:56', device: 'D4 - CC11', sensor: 'Ruido', message: 'El nivel de ruido ha excedido el límite permitido.' }
  ];

  const handleUnarchive = (id) => {
    setSelectedNotificationId(id);
    setModalVisible(true);
  };

  const confirmUnarchive = () => {
    console.log("Notificación desarchivada", selectedNotificationId);
    setModalVisible(false);
  };

  const cancelUnarchive = () => {
    setModalVisible(false);
  };

  return (
    <View className="flex-1 relative">
      <Image 
        source={require("../assets/fondo.jpg")} 
        className="absolute w-full h-full opacity-30" 
        resizeMode="cover" 
      />

      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="flex-row items-center ml-2.5 mb-6">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="home" size={25} color="#000" />
            </TouchableOpacity>
            <Text className="text-xl ml-2.5">Notificaciones Archivadas</Text>
          </View>
        </View>

        <View className="px-4">
          {archivedNotifications.map((notification, index) => (
            <View
              key={index}
              className="mb-4 p-4 bg-white rounded-lg shadow-sm shadow-black"
            >
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-bold text-gray-800">{notification.sensor}</Text>
                <TouchableOpacity
                  onPress={() => handleUnarchive(notification.id)}
                >
                  <Icon name="reload-outline" size={24} color="#000" /> 
                </TouchableOpacity>
              </View>

              <Text className="text-base text-gray-600">{notification.message}</Text>

              <View className="flex-row justify-between items-center mt-2">
                <Text className="text-sm text-gray-500">Dispositivo: {notification.device}</Text>
                <Text className="text-sm text-gray-500">{notification.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity 
        className="absolute bottom-5 right-5 bg-[rgba(222,255,53,0.8)] w-12 h-12 rounded-full items-center justify-center shadow-sm shadow-black" 
        onPress={() => navigation.navigate("Notifications")} 
      >
        <Icon name="notifications" size={30} color="#000" /> 
      </TouchableOpacity>

      <StatusBar style="dark" />

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Desarchivar Notificación</Text>
            <Text style={styles.modalMessage}>¿Estás seguro que deseas desarchivar esta notificación?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={cancelUnarchive}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmUnarchive}
              >
                <Text style={styles.confirmButtonText}>Desarchivar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
  },
  confirmButton: {
    backgroundColor: "#DEFF35",
  },
  cancelButtonText: {
    color: "#000",
  },
  confirmButtonText: {
    color: "#000",
  },
});

export default ArchivedNotifications;