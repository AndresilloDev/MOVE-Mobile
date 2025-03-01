import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

const buildings = [
  { id: "1", name: "D4", number_of_devices: 8, number_of_spaces: 7 },
  { id: "2", name: "D3", number_of_devices: 7, number_of_spaces: 7 },
  { id: "3", name: "D2", number_of_devices: 10, number_of_spaces: 8 },
  { id: "4", name: "D1", number_of_devices: 6, number_of_spaces: 6 },
];

const BuildingCard = ({ building, navigation, onEdit, onDelete }) => (
  <TouchableOpacity
    className="bg-white p-4 rounded-lg shadow-md flex-row justify-between mb-4 mx-6"
    onPress={() => navigation.navigate("Classrooms", { building })}
  >
    <View>
      <Text className="font-bold mb-2">Nombre: <Text className="font-normal">{building.name}</Text></Text>
      <Text>Dispositivos Registrados: {building.number_of_devices}</Text>
      <Text>Aulas Registradas: {building.number_of_spaces}</Text>
    </View>

    <View className="flex flex-row space-x-2 items-end">
      <TouchableOpacity onPress={() => onEdit(building)}>
        <Icon name="create-outline" size={24} color="#4CAF50" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(building)}>
        <Icon name="trash-outline" size={24} color="#F44336" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const BuildingsScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBuildings = buildings.filter((building) =>
    Object.values(building).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleEdit = (building) => {
    Alert.alert("Editar", `Editar información de ${building.name}`);
  };

  const handleDelete = (building) => {
    Alert.alert("Eliminar", `Docencia ${building.name} eliminada`);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Image
        source={require("../assets/bg.png")}
        className="absolute top-0 left-0 w-full h-full"
        style={{ width: "600%", height: "100%" }}
        resizeMode="cover"
      />

      <Header navigation={navigation} />

      {/* Breadcrumb Navigation */}
      <View className="m-4 ml-6 flex-row items-center">
        <Icon name="home" size={25} color="#000" className="mr-2" />
        <Icon name="chevron-forward-sharp" size={25} color="#000" className="mr-2" />
        <Text className="text-xl">Docencias</Text>
      </View>

      {/* Search Bar */}
      <View className="items-center mt-2 py-2 px-1">
        <View className="flex-row items-center w-11/12 h-10 border border-black rounded-xl bg-white">
          <TextInput
            className="flex-1 h-full pl-3"
            placeholder="Buscar docencia..."
            placeholderTextColor={"gray"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity className="bg-[rgba(222,255,53,0.8)] w-10 h-full justify-center items-center rounded-r-xl">
            <Icon name="search" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Buildings List */}
      <FlatList
        data={filteredBuildings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BuildingCard
            building={item}
            navigation={navigation}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
      />

      {/* Add Buildings Button */}
      <TouchableOpacity
        className="absolute bottom-5 right-5 bg-[rgba(222,255,53,0.8)] w-12 h-12 rounded-full items-center justify-center shadow-sm shadow-black"
        onPress={() => navigation.navigate("AddBuilding")}
      >
        <Icon name="add" size={30} color="#000" />
      </TouchableOpacity>

      <StatusBar style="dark" />
    </View>
  );
};

export default BuildingsScreen;