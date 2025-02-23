import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { AuthContext } from "../context/AuthContext";

const ChangePasswordRecoverScreen = () => {
    const [code, setCode] = useState(["", "", "", "", ""]);

    const { login } = useContext(AuthContext);

    return (
        <View className="flex-1">
            <ImageBackground
                source={require('../assets/fondo.jpg')}
                className="flex-1"
                style={{ opacity: 0.5 }}
            />
            <View className="absolute inset-0 justify-center items-center bg-white bg-opacity-70 p-4 rounded-lg">
                <Text className="text-xl font-bold mb-6 text-center text-black">Confirmar tu cuenta</Text>
                <View className="flex-row justify-between mb-6">
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            className="border border-light-gray rounded-lg w-12 h-12 text-center mx-1"
                            maxLength={1}
                            keyboardType="numeric"
                            value={digit}
                            onChangeText={(text) => {
                                const newCode = [...code];
                                newCode[index] = text;
                                setCode(newCode);
                            }}
                        />
                    ))}
                </View>
                <TouchableOpacity className="bg-[#DEFF35] border border-black rounded-lg w-32 py-2"
                    onPress={() => login("admin","admin123")}>
                    <Text className="text-center text-black font-bold">Confirmar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChangePasswordRecoverScreen;