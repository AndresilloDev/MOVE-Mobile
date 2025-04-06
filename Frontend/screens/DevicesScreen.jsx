import React, {useCallback, useState} from "react";
import {Alert, FlatList, Image, Text, TextInput, TouchableOpacity, View,} from "react-native";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/Ionicons";
import {Search} from "../components/Search";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useNotification} from "../context/NotificationContext";
import Loader from "../components/Loader";
import {getDevices} from "../api/devices.api";

const DeviceCard = ({ device, navigation, onEdit, onDelete }) => (
  <TouchableOpacity
    className="bg-white p-4 rounded-lg shadow-md flex-row justify-between mb-4 mx-6"
    onPress={() => navigation.navigate("SelectedDevice", { device })}>
    <View>
        <Text className="font-bold mb-2">Dispositivo: #{device._id}</Text>
        <Text className="font-bold">Nombre: <Text className="font-normal">{device.name}</Text></Text>
        <Text className="font-bold">Docencia: <Text className="font-normal">{device.building ? device.building.name : "Sin Edificio"}</Text></Text>
        <Text className="font-bold">Aula: <Text className="font-normal">{device.space ? device.space.name : "Sin Aula"}</Text></Text>
    </View>

    <View className="flex flex-row space-x-2 items-end">
      <TouchableOpacity onPress={() => onEdit(device)}>
        <Icon name="create-outline" size={24} color="#4CAF50" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(device)}>
        <Icon name="trash-outline" size={24} color="#F44336" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const DevicesScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const { getError, getSuccess } = useNotification();
    const [devices, setDevices] = useState([]);

    const fetchDevices = async () => {
        try {
            setLoading(true);
            const response = await getDevices();
            setDevices(response.data.sort((a, b) => a.name.localeCompare(b.name)));
        } catch (error) {
            getError("Error al cargar los edificios. Por favor, inténtelo de nuevo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchDevices();
        }, [])
    );

    const filteredDevices = devices.filter((device) =>
        device.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

  const handleEdit = (device) => {
      navigation.navigate("EditDevice", { device: device });

  };

  const handleDelete = (device) => {
      navigation.navigate("DeleteDevice", { device: device });
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
        <Icon className="mr-2" name="home" size={25} color="#000" />
        <Icon className="mr-2" name="chevron-forward-sharp" size={25} color="#000" />
          <Text className="text-xl">Dispositivos</Text>
      </View>

        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />

        {loading ? (
            <Loader/>
        ) : (
            <>
                <FlatList
                    data={filteredDevices}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <DeviceCard
                            device={item}
                            navigation={navigation}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => handleDelete(item)}
                        />
                    )}
                    contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
                />

                <TouchableOpacity
                    className="absolute bottom-5 right-5 bg-[rgba(222,255,53,0.8)] w-12 h-12 rounded-full items-center justify-center shadow-sm shadow-black"
                    onPress={() => navigation.navigate("ConnectDevice")}>
                    <Icon name="add" size={30} color="#000" />
                </TouchableOpacity>
            </>
        )}
    </View>
  );
};

export default DevicesScreen;
