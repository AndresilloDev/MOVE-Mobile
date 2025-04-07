import React, {useContext, useRef, useState} from "react";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import {useNotification} from "../context/NotificationContext";
import {AuthContext} from "../context/AuthContext";
import Header from "../components/Header";

const ProfileScreen = () => {
    const { user, updateProfile } = useContext(AuthContext);
    const [name, setName] = useState(user?.name || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const { getSuccess, getError } = useNotification();
    const navigation = useNavigation();

    const nameRef = useRef();
    const lastNameRef = useRef();

    const handleUpdateProfile = async () => {
        if (!name || !lastName) {
            getError("Por favor, complete todos los campos.");
            return;
        }
        user.name = name;
        user.lastName = lastName;

        try {
            await updateProfile(user);
            getSuccess("Perfil actualizado correctamente.");
            navigation.goBack();
        } catch (error) {
            getError("Error al actualizar el perfil. Por favor, inténtelo de nuevo.");
        }
    };


    return (
        <View className="flex-1 bg-gray-100">
            <Image
                source={require("../assets/bg.png")}
                className="absolute top-0 left-0 w-full h-full"
                style={{ width: "600%", height: "100%" }}
                resizeMode="cover"/>

            <Header navigation={navigation} />

            {/* Breadcrumb Navigation */}
            <View className="m-4 ml-6 flex-row items-center">
                <Icon name="home" size={25} color="#000" className="mr-2" />
                <Icon name="chevron-forward-sharp" size={25} color="#000" className="mr-2" />
                <Text className="text-xl">Perfil</Text>
            </View>

            {/* Contenido principal */}
            <View className="flex-1 items-center justify-center px-4 max-w-xl">
                <Text className="text-2xl font-bold mb-4 text-center">Editar Perfil</Text>

                <TextInput
                    className="min-w-[75%] h-12 border border-gray-300 rounded-lg px-4 mb-6 bg-white"
                    placeholder="Nombre"
                    ref={nameRef}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <TextInput
                    className="min-w-[75%] h-12 border border-gray-300 rounded-lg px-4 mb-6 bg-white"
                    placeholder="Apellido"
                    ref={lastNameRef}
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
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
                        onPress={() => handleUpdateProfile()}
                    >
                        <Text className="text-primary text-lg text-center font-semibold">Actualizar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ProfileScreen;