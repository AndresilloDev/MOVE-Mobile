import React, { useState } from "react";
import {Button, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native"
import Icon from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";

const BuildingsScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState("");

    const buildings = [
        { id: '1', name: 'D4', number_of_devices: 8, number_of_spaces: 7 },
        { id: '2', name: 'D3', number_of_devices: 7, number_of_spaces: 7 },
        { id: '3', name: 'D2', number_of_devices: 10, number_of_spaces: 8 },
        { id: '4', name: 'D1', number_of_devices: 6, number_of_spaces: 6 }
    ];

    return (
        <View className="flex-1 relative">
            <Image
                source={require("../assets/fondo.jpg")}
                className="absolute w-full h-full opacity-30"
                resizeMode="cover"
            />

            <ScrollView className="flex-1">
                <View className="p-4">
                    <View className="flex-row items-center ml-2.5 mb-6">
                        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                            <Icon name="home" size={25} color="#000" />
                        </TouchableOpacity>
                        <Text className="text-xl ml-2.5">Docencias</Text>
                    </View>

                    {/* Nuevo buscador */}
                    <View className="items-center">
                        <View className="flex-row items-center w-full h-10 border border-black rounded-xl bg-white">
                            <TextInput
                                className="flex-1 h-full pl-3"
                                placeholder="Buscar docencia..."
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                            <TouchableOpacity
                                className="bg-[rgba(222,255,53,0.8)] w-10 h-full justify-center items-center rounded-r-xl"
                            >
                                <Icon name="search" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View className="px-4" >
                    {buildings.map((buildings, index) => (
                        <TouchableOpacity onPress={() => navigation.navigate("Classrooms")}>
                            <View
                                key={index}
                                className="mb-4 p-4 bg-white rounded-lg shadow-sm shadow-black"
                            >
                                <Text className="text-lg font-bold text-gray-800">
                                    Nombre:
                                    <Text className="text-lg font-normal text-gray-800"> {buildings.name}</Text>
                                </Text>
                                <Text className="text-lg font-normal text-gray-800 mt-2">Dispositivos Registrados: {buildings.number_of_devices}</Text>
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-lg font-normal text-gray-800">Aulas Registradas: {buildings.number_of_spaces}</Text>
                                    <View className="flex-row justify-end gap-3">
                                        <TouchableOpacity onPress={() => console.log("Eliminar Edificio", buildings.id)}>
                                            <Icon name="trash-bin" size={24} color="#000" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => console.log("Editar Edificio", buildings.id)}>
                                            <Icon name="pencil-sharp" size={24} color="#000" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <View className="px-4">
                    <TouchableOpacity onPress={() => console.log("Añadir Edificio")}>
                        <View className="mb-4 p-4 bg-white rounded-lg shadow-sm shadow-black flex-1 w-full items-center justify-center">
                            <Icon name="add" size={48} color="#808080" />
                            <Text className="text-lg font-normal text-gray-400 mt-2 text-center">Añadir nueva docencia</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <StatusBar style="dark" />
        </View>
    )
}

export default BuildingsScreen;