import React, {useContext, useState} from "react";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {AuthContext} from "../context/AuthContext";
import Header from "../components/Header";

const ChangePasswordRecoverScreen = ({navigation}) => {
    const [code, setCode] = useState(["", "", "", "", ""]);

    const { login } = useContext(AuthContext);

    return (
        <View className="flex-1">

        <Image
            source={require("../assets/bg.png")} 
            className="absolute top-0 left-0 w-fill h-full" 
            style={{ width: "600%", height: "100%"}}
            resizeMode="cover" 
      	/>

        <Header navigation={navigation} />
            
            <View className="mt-60 justify-center items-center p-4 rounded-lg">
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

                <TouchableOpacity
				className="bg-action-primary rounded-lg px-8 border-lines"
				style={{ borderWidth: 1.3, paddingVertical: 5, width: "80%" }}
				onPress={() => login("admin","admin123")}>
				<Text className="text-primary text-lg text-center">Iniciar Sesión</Text>

			    </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChangePasswordRecoverScreen;