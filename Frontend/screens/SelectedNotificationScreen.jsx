import React from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";

const SelectedDeviceScreen = ({navigation}) => {
    return (
        <View className="flex-1" >

        <Image
            source={require("../assets/bg.png")} 
            className="absolute top-0 left-0 w-fill h-full" 
            style={{ width: "600%", height: "100%"}}
            resizeMode="cover" 
      	/>

        <Header navigation={navigation} />

            <View className="p-4">
            <View className="flex-row items-center ml-2.5 mb-6">
                <Icon className="mr-2" name="home" size={25} color="#000" />
                <Icon className="mr-2" name="chevron-forward-sharp" size={25} color="#000" />
                <Text className="mr-2 text-xl">Notificaciones</Text>
                <Icon className="mr-2" name="chevron-forward-sharp" size={25} color="#000" />
                <Text className="text-xl">Temperatura</Text>
            </View>
            </View>
            <View className="px-4">
                <View className="mb-4 p-4 bg-white rounded-lg shadow-sm shadow-black flex-row justify-between">
                    <View>
                        <Text className="text-lg font-bold text-gray-800">Dispositivo:
                            <Text className="text-lg font-normal text-gray-800"> #246568</Text>
                        </Text>
                        <Text className="text-lg font-bold text-gray-800">Nombre:
                            <Text className="text-lg font-normal text-gray-800"> D4 - CC11</Text>
                        </Text>
                    </View>
                    <View className="flex-col items-end">
                        <Text className="text-lg font-bold text-gray-800">Aula:
                            <Text className="text-lg font-normal text-gray-800"> CC11</Text>
                        </Text>
                        <Text className="text-lg font-bold text-gray-800">Docencia:
                            <Text className="text-lg font-normal text-gray-800"> D4</Text>
                        </Text>
                    </View>
                </View>
            </View>
            <View className="px-4">
                <View className="mb-4 p-4 bg-white rounded-lg shadow-sm shadow-black flex-col items-center">
                    <View className="flex-row justify-between w-full">
                        <View className="flex-col items-start">
                            <Text className="text-lg font-bold text-gray-800">Temperatura:</Text>
                            <Text className="text-lg font-normal text-gray-800">Actual 124ºC</Text>
                        </View>
                        <View className="flex-col items-end">
                            <Text className="text-lg font-bold text-gray-800">Fecha:</Text>
                            <Text className="text-lg font-normal text-gray-800">2025-01-30 11:30:56</Text>
                        </View>
                    </View>
                    <View className="p-1">
                        <Icon name="image-outline" size={300} color="#000" />
                    </View>
                </View>
            </View>
            <TouchableOpacity className="bg-[rgba(222,255,53,0.8)] border border-black rounded-xl w-2/5 py-2 self-center mb-4">
                <Text className="font-bold text-lg text-center">Notificación Resuelta</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SelectedDeviceScreen;