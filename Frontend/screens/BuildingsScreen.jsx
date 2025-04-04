import React, {useCallback, useState} from "react";
import {FlatList, Image, Text, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {StatusBar} from "expo-status-bar";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import Header from "../components/Header";
import {getBuildings} from "../api/buildings.api";
import {useNotification} from "../context/NotificationContext";
import {Search} from "../components/Search";
import Loader from "../components/Loader";

const BuildingCard = ({ building, navigation, onEdit, onDelete }) => (
  <TouchableOpacity
    className="bg-white p-4 rounded-lg shadow-md flex-row justify-between mb-4 mx-6"
    onPress={() => navigation.navigate("Spaces", { building })}
  >
    <View>
      <Text className="font-bold mb-2">Nombre: <Text className="font-normal">{building.name}</Text></Text>
      <Text>Dispositivos Registrados: {building.deviceCount}</Text>
      <Text>Aulas Registradas: {building.spaceCount}</Text>
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
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { getError, getSuccess } = useNotification();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBuildings = async () => {
    try {
      setLoading(true);
      const response = await getBuildings();
      setBuildings(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("Error fetching buildings:", error);
      getError("Error al cargar los edificios. Por favor, inténtelo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
      useCallback(() => {
        fetchBuildings();
      }, [])
  );
  const filteredBuildings = buildings.filter((building) =>
    building.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleEdit = (building) => {
    navigation.navigate("EditBuilding", { building: building });
  };

  const handleDelete = (building) => {
    navigation.navigate("DeleteBuilding", { building: building });
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
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />

      {/* Buildings List */}
      {loading ? (
          <Loader />
      ) : (
          <>
            <FlatList
                data={filteredBuildings}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <BuildingCard
                        building={item}
                        navigation={navigation}
                        onEdit={() => handleEdit(item)}
                        onDelete={() => handleDelete(item)}
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
          </>
      )}
      <StatusBar style="dark" />
    </View>
  );
};

export default BuildingsScreen;