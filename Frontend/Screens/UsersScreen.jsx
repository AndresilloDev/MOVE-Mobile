import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const UsersScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedUserId, setExpandedUserId] = useState(null);

    const users = [
        { id: 129340, username: "20233tn097@utez", name: "Sebastian", surname: "Jimenez" },
        { id: 129341, username: "20233tn098@utez", name: "Carlos", surname: "Hernandez" },
        { id: 129342, username: "20233tn099@utez", name: "Maria", surname: "Lopez" },
        { id: 129343, username: "20233tn098@utez", name: "Ronal", surname: "Dinho" },
        { id: 129344, username: "20233tn098@utez", name: "Cesar", surname: "Rin" },
        { id: 129345, username: "20233tn098@utez", name: "Erikiti", surname: "Rijillo" },
    ];

    const toggleExpand = (id) => {
        setExpandedUserId(expandedUserId === id ? null : id);
    };

    return (
        <ImageBackground
            source={require("../assets/fondo.jpg")}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <View className="flex-1 bg-gray-50/80">
                <View className="p-4 items-center">
                    <View className="flex-row items-center w-11/12 h-10 border border-black rounded-xl bg-white">
                        <TextInput
                            className="flex-1 h-full pl-3"
                            placeholder="Buscar usuario..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <TouchableOpacity className="bg-yellow-400 w-10 h-full justify-center items-center rounded-r-xl">
                            <Ionicons name="search" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Títulos de la tabla */}
                <View className="flex-row justify-start px-4 mb-2 mt-2">
                    <Text className="font-bold text-lg w-2/5 text-left">ID</Text>
                    <Text className="font-bold text-lg w-2/5 text-left">Usuario</Text>
                </View>

                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View className="p-2 border-b border-gray-300">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-xl w-1/5 text-center">{item.id}</Text>
                                <Text className="text-xl w-3/5 text-center">{item.username}</Text>
                                <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                                    <Text className="text-xl ml-2">{expandedUserId === item.id ? "▲" : "▼"}</Text>
                                </TouchableOpacity>
                            </View>
                            {expandedUserId === item.id && (
                                <View className="pt-2">
                                    <Text>{item.name} {item.surname}</Text>
                                    <View className="flex-row justify-end mt-2">
                                        <TouchableOpacity className="ml-2">
                                            <Ionicons name="trash" size={20} color="black" />
                                        </TouchableOpacity>
                                        <TouchableOpacity className="ml-2">
                                            <Ionicons name="create" size={20} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                    )}
                    className="flex-1 mt-4"
                />

                <TouchableOpacity
                    className="bg-yellow-400 border border-black rounded-xl w-2/5 py-2 items-center self-end mb-4"
                    onPress={() => navigation.navigate("AddAdminScreen")}
                >
                    <Text className="font-bold text-lg text-center">Agregar administrador</Text>
                </TouchableOpacity>

                <View className="flex-row justify-around py-2 border-t border-gray-300">
                    <TouchableOpacity className="items-center">
                        <Ionicons name="laptop" size={24} color="black" />
                        <Text>Dispositivos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="items-center">
                        <Ionicons name="book" size={24} color="black" />
                        <Text>Docencias</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-yellow-400 rounded-md p-1">
                        <Ionicons name="person" size={24} color="black" />
                        <Text className="font-bold">Administradores</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="items-center">
                        <Ionicons name="notifications" size={24} color="black" />
                        <Text>Notificaciones</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

export default UsersScreen;
