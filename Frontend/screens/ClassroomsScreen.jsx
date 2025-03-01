import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import BuildingsScreen from "./BuildingsScreen";

const classrooms = [
  { id: "CC11", devices: 1 },
  { id: "CC12", devices: 2 },
  { id: "CC13", devices: 1 },
  { id: "CC14", devices: 1 },
];

const ClassroomCard = ({ classroom, navigation, onEdit, onDelete }) => (
  <TouchableOpacity
    className="bg-white p-4 rounded-lg shadow-md flex-row justify-between mb-4 mx-6"
    onPress={() => navigation.navigate("ClassroomDetails", { classroom })}
  >
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
  </TouchableOpacity>
);

const ClassroomsScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClassrooms = classrooms.filter((classroom) =>
    classroom.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (classroom) => {
    Alert.alert("Editar", `Editar información del aula ${classroom.id}`);
  };

  const handleDelete = (classroom) => {
    Alert.alert("Eliminar", `Aula ${classroom.id} eliminada`);
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

      {/* Breadcrumb Navigation */}
      <View className="m-4 ml-6 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack(BuildingsScreen)}>
          <Icon name="home" size={25} color="#000" />
        </TouchableOpacity>
        <Icon className="mr-2" name="chevron-forward-sharp" size={25} color="#000" />
        <Text className="mr-2 text-xl">Docencias</Text>
        <Icon className="mr-2" name="chevron-forward-sharp" size={25} color="#000" />
        <Text className="text-xl">D4</Text>

      </View>

      {/* Search Bar */}
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

      {/* Classrooms List */}
      <FlatList
        data={filteredClassrooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClassroomCard
            classroom={item}
            navigation={navigation}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
      />

      {/* Add Classroom Button */}
      <TouchableOpacity
        className="absolute bottom-5 right-5 bg-[rgba(222,255,53,0.8)] w-12 h-12 rounded-full items-center justify-center shadow-sm shadow-black"
        onPress={() => navigation.navigate("AddClassroom")}
      >
        <Icon name="add" size={30} color="#000" />
      </TouchableOpacity>

      <StatusBar style="dark" />
    </View>
  );
};

export default ClassroomsScreen;