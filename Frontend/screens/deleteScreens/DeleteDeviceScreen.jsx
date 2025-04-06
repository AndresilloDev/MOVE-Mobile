import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useNotification} from "../../context/NotificationContext";
import Header from "../../components/Header";
import Icon from "react-native-vector-icons/Ionicons";
import {deleteDevice} from "../../api/devices.api";

const DeleteBuildingScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { device } = route.params;
    const { getSuccess, getError } = useNotification();

    const handleDelete = async () => {
        try {
            const response = await deleteDevice(device._id);
            if (response.status === 200) {
                getSuccess("Dispositivo eliminado correctamente.");
                navigation.goBack();
            } else {
                getError("Error al eliminar el dispositivo. Por favor, inténtelo de nuevo más tarde.");
            }
        } catch (error) {
            getError("Error al eliminar el dispositivo. Por favor, inténtelo de nuevo más tarde.");
        }
    };

    return (
        <View className="flex-1 bg-gray-100">
            {/* Background */}
            <Image
                source={require("../../assets/bg.png")}
                className="absolute top-0 left-0 w-full h-full"
                style={{ width: "600%", height: "100%" }}
                resizeMode="cover"
            />

            <Header navigation={navigation} />

            {/* Breadcrumb Navigation */}
            <View className="m-4 ml-6 flex-row items-center">
                <Icon name="home" size={25} color="#000" className="mr-2" />
                <Icon name="chevron-forward-sharp" size={25} color="#000" className="mr-2" />
                <Text className="text-xl">Eliminar Dispositivo</Text>
            </View>

            {/* Contenido central */}
            <View className="flex-1 items-center justify-center px-4 gap-10">
                <Text className="text-2xl font-bold mb-4 text-center">Eliminar Dispositivo</Text>
                <Text>
                    ¿Estás seguro de que deseas eliminar el dispositivo <Text className="font-bold">{device.name}</Text>?
                </Text>

                <View className="w-[75%] flex-row justify-between gap-4">
                    <TouchableOpacity
                        className="py-3 rounded-xl flex-1 items-center border border-black"
                        onPress={() => navigation.goBack()}
                    >
                        <Text className="text-primary text-lg text-center font-semibold">Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="bg-action-primary py-3 rounded-xl flex-[1.2] items-center border border-action-hover"
                        onPress={handleDelete}
                    >
                        <Text className="text-primary text-lg text-center font-semibold">Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default DeleteBuildingScreen;