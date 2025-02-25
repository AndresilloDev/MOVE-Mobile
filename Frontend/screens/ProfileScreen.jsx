import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"

const ProfileScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View className="flex-1 relative">
            <Image
                source={require("../assets/fondo.jpg")}
                className="absolute w-full h-full opacity-30"
                resizeMode="cover"
            />
            <View className="p-4 flex-1 items-center justify-center">
                <Text className="text-2xl ml-2.5 p-4 font-bold">Perfil</Text>
                <TextInput
                    className="w-4/5 h-10 border border-gray-300 rounded-lg mb-2 p-2 bg-white"
                    placeholder="Nombre"
                    autoCapitalize="none"
                    onChangeText={(text) => setUsername(text.trim().toLowerCase())}
                />
                <TextInput
                    className="w-4/5 h-10 border border-gray-300 rounded-lg mb-4 p-2 bg-white"
                    placeholder="Apellidos"
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <TextInput
                    className="w-4/5 h-10 border border-gray-300 rounded-lg mb-4 p-2 bg-white"
                    placeholder="Correo"
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <TextInput
                    className="w-4/5 h-10 border border-gray-300 rounded-lg mb-4 p-2 bg-white"
                    placeholder="Contraseña"
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <TextInput
                    className="w-4/5 h-10 border border-gray-300 rounded-lg mb-4 p-2 bg-white"
                    placeholder="Confirmar Contraseña"
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <View className="w-4/5 flex-row justify-between">
                    <TouchableOpacity
                        className="p-2 border border-gray-300 rounded-lg bg-white mt-3 w-2/5 items-center">
                        <Text className="text-lg">Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="bg-primary p-2 rounded-lg mt-3 w-2/5 border border-black items-center"
                        style={{ borderColor: "#DEFF35" }}>
                        <Text className="text-lg">Actualizar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

export default ProfileScreen;