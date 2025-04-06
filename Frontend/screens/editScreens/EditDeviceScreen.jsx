import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../components/Header";
import Icon from "react-native-vector-icons/Ionicons";
import { getBuildings } from "../../api/buildings.api";
import { getSpacesDevice } from "../../api/spaces.api";
import { updateDevice } from "../../api/devices.api";
import { useNotification } from "../../context/NotificationContext";

const EditDeviceScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { device } = route.params;
    const [name, setName] = useState(device.name || "");
    const [buildingId, setBuildingId] = useState(device.building?._id || "");
    const [buildingName, setBuildingName] = useState(device.building?.name || "");
    const [spaceName, setSpaceName] = useState(device.space?.name || "");

    const [buildings, setBuildings] = useState([]);
    const [spaces, setSpaces] = useState([]);
    const { getSuccess, getError } = useNotification();

    useEffect(() => {
        const fetchData = async () => {
            const buildingData = await getBuildings();
            const sortedBuildings = buildingData.data.sort((a, b) => a.name.localeCompare(b.name));
            setBuildings(sortedBuildings);

            if (device.building?._id) {
                const spaceData = await getSpacesDevice(device.building._id);
                const sortedSpaces = spaceData.data.sort((a, b) => a.name.localeCompare(b.name));
                setSpaces(sortedSpaces);

                if (device.space?.name) {
                    const existsInSpaces = sortedSpaces.some((s) => s.name === device.space.name);
                    if (existsInSpaces) {
                        setSpaceName(device.space.name);
                    }
                }
            }
        };
        fetchData();
    }, []);

    const fetchSpaces = async (buildingId, autoSelect = true) => {
        try {
            if (!buildingId) {
                setSpaces([]);
                return;
            }
            const response = await getSpacesDevice(buildingId);
            const sortedSpaces = response.data.sort((a, b) => a.name.localeCompare(b.name));
            setSpaces(sortedSpaces);

            if (autoSelect && device.space?.name) {
                const existsInSpaces = sortedSpaces.some((s) => s.name === device.space.name);
                if (existsInSpaces) {
                    setSpaceName(device.space.name);
                }
            }
        } catch (error) {
            console.error("Error fetching spaces:", error);
        }
    };

    const handleEdit = async () => {
        try {
            const editedDevice = {
                ...device,
                name,
                building: { name: buildingName },
                space: { name: spaceName },
            };
            const response = await updateDevice(device._id, editedDevice);
            if (response.status === 200) {
                getSuccess("Dispositivo editado correctamente.");
                navigation.goBack();
            } else {
                getError("Error al editar el dispositivo.");
            }
        } catch (error) {
            getError("Error al editar el dispositivo.");
        }
    };

    return (
        <View className="flex-1 bg-gray-100">
            <Image
                source={require("../../assets/bg.png")}
                className="absolute top-0 left-0 w-full h-full"
                style={{ width: "600%", height: "100%" }}
                resizeMode="cover"
            />
            <Header navigation={navigation} />

            <View className="m-4 ml-6 flex-row items-center">
                <Icon name="home" size={25} color="#000" className="mr-2" />
                <Icon name="chevron-forward-sharp" size={25} color="#000" className="mr-2" />
                <Text className="text-xl">Editar Dispositivo</Text>
            </View>

            <View className="flex-1 items-center justify-center px-4">
                <Text className="text-2xl font-bold mb-4 text-center">Editar Dispositivo</Text>

                <TextInput
                    className="min-w-[75%] h-12 border border-gray-300 rounded-lg px-4 mb-4 bg-white"
                    placeholder="Nombre del Dispositivo"
                    value={name}
                    onChangeText={setName}
                />

                {/* Select de Edificio */}
                <View className="w-[75%] bg-white border border-gray-300 rounded-lg mb-4">
                    <Picker
                        selectedValue={buildingName}
                        onValueChange={(itemValue) => {
                            setBuildingName(itemValue);
                            if (itemValue !== buildingName) {
                                setBuildingId(itemValue);
                                setSpaceName(""); // solo borramos si el edificio cambió
                                const selectedBuilding = buildings.find((b) => b.name === itemValue);
                                if (selectedBuilding) {
                                    fetchSpaces(selectedBuilding._id);
                                } else {
                                    setSpaces([]);
                                }
                            }
                        }}
                    >
                        <Picker.Item label="Seleccionar edificio" value="" />
                        {buildings.map((building) => (
                            <Picker.Item key={building._id} label={building.name} value={building.name} />
                        ))}
                    </Picker>
                </View>

                {/* Select de Aula */}
                <View className="w-[75%] bg-white border border-gray-300 rounded-lg mb-4">
                    <Picker
                        selectedValue={spaceName}
                        enabled={spaces.length > 0}
                        onValueChange={(itemValue) => setSpaceName(itemValue)}
                    >
                        <Picker.Item label="Seleccionar aula" value="" />
                        {spaces.map((space) => (
                            <Picker.Item key={space._id} label={space.name} value={space.name} />
                        ))}
                    </Picker>
                </View>

                <View className="w-[75%] flex-row justify-between gap-4">
                    <TouchableOpacity
                        className="py-3 rounded-xl flex-1 items-center border border-black"
                        onPress={() => navigation.goBack()}
                    >
                        <Text className="text-primary text-lg text-center font-semibold">Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-action-primary py-3 rounded-xl flex-[1.2] items-center border border-action-hover"
                        onPress={handleEdit}
                    >
                        <Text className="text-primary text-lg text-center font-semibold">Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default EditDeviceScreen;