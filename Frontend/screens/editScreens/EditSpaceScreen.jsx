import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, Modal, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../../components/Header";
import { useNotification } from "../../context/NotificationContext";
import { updateSpace } from "../../api/spaces.api";

const EditSpaceScreen = () => {
  const navigation = useNavigation();
  const { building } = route.params;
  const { classroom } = route.params;
  const { getError, getSuccess } = useNotification();

  const [classroomName, setClassroomName] = useState(classroom.id);
  
  const handleSave = async () => {
    if (!classroomName) {
      getError("Por favor, complete todos los campos.");
      return;
    }  
  
    try {
      await updateSpace(building._id, classroom._id, { name: classroomName });
      getSuccess("Aula editada correctamente.");
      navigation.goBack();
    }
    catch (error) {
      getError("Error al editar el aula. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <View className="flex-1">
      <Image
        source={require("../../assets/bg.png")}
        className="absolute top-0 left-0 w-full h-full"
        style={{ width: "600%", height: "100%" }}
        resizeMode="cover"
      />

      <Header navigation={navigation} />

      <View className="m-4 ml-6 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="home" size={25} color="#000" />
        </TouchableOpacity>
        <Icon className="mr-2" name="chevron-forward-sharp" size={25} color="#000" />
        <Text className="mr-2 text-xl">Docencias</Text>
        <Icon className="mr-2" name="chevron-forward-sharp" size={25} color="#000" />
        <Text className="text-xl">Editar Aula</Text>
      </View>

      {/* Form */}
      <View className="m-6">
        <Text className="text-lg font-bold mb-2">Nombre del Aula</Text>
        <TextInput
          className="h-12 border border-black rounded-xl bg-white px-4 mb-4"
          placeholder="Ej: CC11"
          value={classroomName}
          onChangeText={setClassroomName}
        />

        <TouchableOpacity
          className="bg-[rgba(222,255,53,0.8)] h-12 rounded-xl items-center justify-center"
          onPress={handleSave}
        >
          <Text className="text-lg font-bold">Guardar Cambios</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" />
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

export default EditSpaceScreen;