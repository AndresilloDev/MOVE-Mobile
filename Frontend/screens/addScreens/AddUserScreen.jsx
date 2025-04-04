import React, {useState} from "react";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../../components/Header";
import {register} from "../../api/users.api";
import {useNotification} from "../../context/NotificationContext";

const AddUser = () => {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { getSuccess, getError } = useNotification();

    const handleAddUser = async () => {
        if (!name || !lastName || !user || !password) return getError("Por favor, completa todos los campos.");
        if (password.length < 6) return getError("La contraseña debe tener al menos 6 caracteres.");

        const newUser = {
            name,
            lastName,
            user,
            password,
        };

        try {
            const response = await register(newUser);
            //await handleConfirmEmail(newUser.user)
            if (response.status === 201) {
                getSuccess("Usuario agregado correctamente.");
                navigation.goBack();
            } else {
                getError("Error al agregar el usuario. Por favor, inténtelo de nuevo más tarde.");
            }
        } catch (error) {
            getError("Error al agregar el usuario. Por favor, inténtelo de nuevo más tarde.");
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

            {/* Breadcrumb Navigation */}
            <View className="m-4 ml-6 flex-row items-center">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="home" size={25} color="#000" />
                </TouchableOpacity>
                <Icon name="chevron-forward-sharp" size={25} color="#000" className="mr-2" />
                <Text className="text-xl">Agregar Administrador</Text>
            </View>

            {/* Form Content */}
            <View className="flex-1 items-center justify-center px-4">
                <Text className="text-2xl font-bold mb-4 text-center">Agregar Administrador</Text>

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

                <TextInput
                    className="min-w-[75%] h-12 border border-gray-300 rounded-lg px-4 mb-6 bg-white"
                    placeholder="Correo Electrónico"
                    value={user}
                    onChangeText={setUser}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    className="min-w-[75%] h-12 border border-gray-300 rounded-lg px-4 mb-6 bg-white"
                    placeholder="Contraseña"
                    secureTextEntry
                    value={password}
                    autoCapitalize="none"
                    onChangeText={setPassword}
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
                        onPress={handleAddUser}
                    >
                        <Text className="text-primary text-lg text-center font-semibold">Agregar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="dark" />
        </View>
    );
};

export default AddUser;