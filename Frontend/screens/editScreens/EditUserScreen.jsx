import React, {useState} from "react";
import {Image, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../../components/Header";
import {updateUser} from "../../api/users.api";
import {useNotification} from "../../context/NotificationContext";

const EditUser = ({ route }) => {
    const navigation = useNavigation();
    const { user } = route.params;
    const [name, setName] = useState(user.name);
    const [lastName, setLastName] = useState(user.lastName);
    const { getError, getSuccess } = useNotification();

    const handleSave = async () => {
        if (!name || !lastName) {
            getError("Por favor, complete todos los campos.");
            return;
        }

        try {
            const updatedUser = {
                _id: user._id,
                name: name,
                lastName: lastName
            };

            await updateUser(updatedUser);
            getSuccess("Usuario editado correctamente.");
            navigation.goBack();
        } catch (error) {
            getError("Error al editar el usuario. Por favor, inténtelo de nuevo.");
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
                <Icon name="home" size={25} color="#000" />
                <Icon className="mr-2" name="chevron-forward-sharp" size={25} color="#000" />
                <Text className="text-xl">Editar Administrador</Text>
            </View>

            <View className="flex-1 items-center justify-center px-4">
                <Text className="text-2xl font-bold mb-4 text-center">Editar Usuario</Text>
                <TextInput
                    className="min-w-[75%] h-12 border border-gray-300 rounded-lg px-4 mb-6 bg-white"
                    placeholder="Nombre del Usuario"
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    className="min-w-[75%] h-12 border border-gray-300 rounded-lg px-4 mb-6 bg-white"
                    placeholder="Apellidos del Usuario"
                    value={lastName}
                    onChangeText={setLastName}
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
                        onPress={handleSave}
                    >
                        <Text className="text-primary text-lg text-center font-semibold">Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="dark" />
        </View>
    );
};

export default EditUser;