import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import Header from "../components/Header";
import Icon from "react-native-vector-icons/Ionicons";

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
        <View className="flex-1">
            <Image
                source={require("../assets/bg.png")}
                className="absolute top-0 left-0 w-fill h-full"
                style={{ width: "600%", height: "100%" }}
                resizeMode="cover"
            />

            <Header navigation={navigation} />

            {/* Breadcrumb Navigation */}
            <View className="m-4 ml-6 flex-row items-center">
                <Icon className="mr-2" name="home" size={25} color="#000" />
                <Icon className="mr-2" name="chevron-forward-sharp" size={25} color="#000" />
                <Text className="text-xl">Administradores</Text>
            </View>

            {/* Barra de búsqueda actualizada */}
            <View className="items-center mt-2 py-2 px-1">
                <View className="flex-row items-center w-11/12 h-10 border border-black rounded-xl bg-white">
                    <TextInput
                        className="flex-1 h-full pl-3"
                        placeholder="Buscar usuario..."
                        placeholderTextColor={"gray"}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity className="bg-[rgba(222,255,53,0.8)] w-10 h-full justify-center items-center rounded-r-xl">
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
                                        <Icon name="create-outline" size={24} color="#4CAF50" />
                                    </TouchableOpacity>
                                    <TouchableOpacity className="ml-2">
                                        <Icon name="trash-outline" size={24} color="#F44336" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                )}
                className="flex-1 mt-4"
            />

            {/* Botón flotante de añadir */}
            <TouchableOpacity
                className="absolute bottom-5 right-5 bg-[rgba(222,255,53,0.8)] w-12 h-12 rounded-full items-center justify-center shadow-sm shadow-black"
                onPress={() => navigation.navigate("AddAdmin")}
            >
                <Icon name="add" size={30} color="#000" />
            </TouchableOpacity>
        </View>
    );
};

export default UsersScreen;