import React, {useState} from "react";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {updateBuilding} from "../../api/buildings.api";
import {useNotification} from "../../context/NotificationContext";
import Header from "../../components/Header";
import Icon from "react-native-vector-icons/Ionicons";

const EditBuildingScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { building } = route.params;
    const [name, setName] = useState(building.name);
    const { getSuccess, getError } = useNotification();

    const handleEdit = async () => {
        try {
            const response = await updateBuilding(building._id, { name });
            if (response.status === 200) {
                getSuccess("Edificio editado correctamente.");
                navigation.goBack();
            } else {
                getError("Error al editar el edificio. Por favor, inténtelo de nuevo más tarde.");
            }
        } catch (error) {
            getError("Error al editar el edificio. Por favor, inténtelo de nuevo más tarde.");
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
                <Text className="text-xl">Editar Edificio</Text>
            </View>

            {/* Contenido central */}
            <View className="flex-1 items-center justify-center px-4 gap-20">
                <Text className="text-2xl font-bold mb-4 text-center">Editar Edificio</Text>

                <TextInput
                    className="min-w-[75%] h-12 border border-gray-300 rounded-lg px-4 mb-6 bg-white"
                    placeholder="Nombre del Edificio"
                    value={name}
                    onChangeText={setName}
                />

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

export default EditBuildingScreen;