import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import { useNotification } from "../context/NotificationContext";
import { getSpaces, deleteSpace } from "../api/spaces.api";

const ClassroomCard = ({ classroom, onEdit, onDelete }) => (
  <View className="bg-white p-4 rounded-lg shadow-md flex-row justify-between mb-4 mx-6">
    <View>
      <Text className="font-bold mb-2">Aula: {classroom.id}</Text>
      <Text>Dispositivos registrados: {classroom.devices}</Text>
    </View>
    <View className="flex flex-row space-x-2 items-end">
      <TouchableOpacity onPress={() => onEdit(classroom)}>
        <Icon name="create-outline" size={24} color="#4CAF50" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(classroom)}>
        <Icon name="trash-outline" size={24} color="#F44336" />
      </TouchableOpacity>
    </View>
  </View>
);

const ClassroomsScreen = () => {
    const route = useRoute();
    const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const { building } = route.params;
  const { getError, getSuccess } = useNotification();
    
  useEffect(() => {
      fetchSpaces();
  }, [building]);

  const fetchSpaces = async () => {
      try {
          setLoading(true);
          const response = await getSpaces(building._id);
          setClassrooms(response.data.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (err) {
          getError("Error al obtener los espacios");
      } finally {
          setLoading(false);
      }
  };

  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClassrooms = classrooms.filter((classroom) =>
    classroom.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (classroom) => {
    navigation.navigate("EditClassroom", { classroom, building });
  };

  const handleDelete = (classroom) => {
    Alert.alert(
      "Eliminar Aula",
      `¿Estás seguro de que deseas eliminar el aula ${classroom.name}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            deleteSpace(building._id, classroom._id)
            getSuccess(`Aula ${classroom.name} eliminada.`);
            setClassrooms((prev) => prev.filter((c) => c._id !== classroom._id));
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View className="flex-1">
      <Image
        source={require("../assets/bg.png")}
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
        <Text className="text-xl">D4</Text>
      </View>

      <View className="items-center mt-2 py-2 px-1">
        <View className="flex-row items-center w-11/12 h-10 border border-black rounded-xl bg-white">
          <TextInput
            className="flex-1 h-full pl-3"
            placeholder="Buscar aula..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            className="bg-[rgba(222,255,53,0.8)] w-10 h-full justify-center items-center rounded-r-xl"
          >
            <Icon name="search" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredClassrooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClassroomCard
            classroom={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
      />

      <TouchableOpacity
        className="absolute bottom-5 right-5 bg-[rgba(222,255,53,0.8)] w-12 h-12 rounded-full items-center justify-center shadow-sm shadow-black"
        onPress={() => navigation.navigate("AddClassroom", { building })}
      >
        <Icon name="add" size={30} color="#000" />
      </TouchableOpacity>

      {/* <Modal
        visible={isDeleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Eliminar Aula</Text>
            <Text style={styles.modalMessage}>
              ¿Estás seguro de que deseas eliminar el aula {selectedClassroom?.id}?
            </Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={cancelDelete}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmDelete}
              >
                <Text style={styles.confirmButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isSuccessModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleSuccessOk}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Éxito</Text>
            <Text style={styles.modalMessage}>
              Aula {selectedClassroom?.id} eliminada.
            </Text>
          </View>
        </View>
      </Modal> */}

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
    color: "#000", 
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#000", // Texto en negro
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

export default ClassroomsScreen;