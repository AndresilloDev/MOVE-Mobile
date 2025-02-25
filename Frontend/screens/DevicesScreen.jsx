import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/Ionicons";

const devices = [
  { id: "246565", name: "D1 - CC9", room: "CC9", teaching: "D1" },
  { id: "246566", name: "D2 - CC10", room: "CC10", teaching: "D2" },
  { id: "246567", name: "D3 - CC11", room: "CC11", teaching: "D3" },
  { id: "246568", name: "D4 - CC11", room: "CC11", teaching: "D4" },
  { id: "246569", name: "D5 - CC12", room: "CC12", teaching: "D5" },
  { id: "246570", name: "D6 - CC13", room: "CC13", teaching: "D1" },
  { id: "246571", name: "D7 - CC14", room: "CC14", teaching: "D2" },
  { id: "246572", name: "D8 - CC15", room: "CC15", teaching: "D3" },
  { id: "246573", name: "D9 - CC16", room: "CC16", teaching: "D4" },
  { id: "246574", name: "D10 - CC17", room: "CC17", teaching: "D5" },
];

const DeviceCard = ({
    device,
    isAddNew = false,
    navigation,
    onEdit,
    onDelete,
  }) => (
    <TouchableOpacity
      className="bg-white p-4 rounded-lg shadow-md flex-row justify-between mb-4 mx-6"
      onPress={() => !isAddNew && navigation.navigate("SelectedDevice", { device })}
    >
      {isAddNew ? (
        <View className="flex-1 justify-center items-center p-2">
          <Text className="text-2xl text-secondary">➕</Text>
          <Text className="text-gray-600">Añadir nuevo dispositivo</Text>
        </View>
      ) : (
        <>
          <View>
            <Text className="font-bold mb-2">Dispositivo: #{device.id}</Text>
            <Text className="font-bold">Nombre: <Text className="font-normal">{device.name}</Text></Text>
            <Text>Aula: {device.room}</Text>
            <Text>Docencia: {device.teaching}</Text>
          </View>
  
          <View className="flex flex-row space-x-2 items-end">
            <TouchableOpacity onPress={() => onEdit(device)}>
              <Icon name="create-outline" size={24} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(device)}>
              <Icon name="trash-outline" size={24} color="#F44336" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
  

const DevicesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDevices = devices.filter((device) =>
    Object.values(device).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const devicesWithAddButton = [...filteredDevices, { id: "add_new" }];

  const handleEdit = (device) => {
    Alert.alert("Editar", `Editar información de ${device.name}`);
  };

  const handleDelete = (device) => {
    Alert.alert("Eliminar", `Dispositivo ${device.name} eliminado`);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Image
        source={require("../assets/bg.png")}
        className="absolute top-0 left-0 w-full h-full"
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />

      <Header navigation={navigation} />

      {/* Breadcrumb Navigation */}
      <View className="m-4 ml-6 flex-row items-center">
        <Icon className="mr-2" name="home" size={25} color="#000" />
        <Icon className="mr-2" name="caret-forward" size={25} color="#000" />
        <Text className="text-xl">Dispositivos</Text>
      </View>

      {/* Search Bar */}
      <View className="items-center mt-2 py-2 px-1">
        <View className="flex-row items-center w-11/12 h-10 border border-black rounded-xl bg-white">
          <TextInput
            className="flex-1 h-full pl-3"
            placeholder="Buscar dispositivo..."
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

      {/* Devices List */}
      <FlatList
        data={devicesWithAddButton}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          item.id === "add_new" ? (
            <DeviceCard isAddNew />
          ) : (
            <DeviceCard
              device={item}
              navigation={navigation}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )
        }
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
      />
    </View>
  );
};

export default DevicesScreen;
