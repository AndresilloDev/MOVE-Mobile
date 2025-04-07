import React, {useCallback, useState} from "react";
import {FlatList, Image, Text, TouchableOpacity, View,} from "react-native";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import {useNotification} from "../context/NotificationContext";
import {getSpacesDevice} from "../api/spaces.api";
import Loader from "../components/Loader";
import {Search} from "../components/Search";

const ClassroomCard = ({ classroom, onEdit, onDelete }) => (
  <View className="bg-white p-4 rounded-lg shadow-md flex-row justify-between mb-4 mx-6">
    <View>
      <Text className="font-bold mb-2">Aula: {classroom.name}</Text>
      <Text>Dispositivos registrados: {classroom.deviceCount}</Text>
    </View>
    <View className="flex flex-row space-x-2 items-end">
      <TouchableOpacity onPress={() => onEdit(classroom)}>
        <Icon name="create-outline" size={24} color="#4CAF50" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(classroom)}>
        <Icon name="trash-outline" size={24} color="#F44336" />
      </TouchableOpacity>
    </View>
  </View>
);

const SpacesScreen = () => {
    const route = useRoute();
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState("");
    const { building } = route.params;
    const { getError, getSuccess } = useNotification();

    const fetchSpaces = async () => {
        try {
            setLoading(true);
            const response = await getSpacesDevice(building._id);
            setClassrooms(response.data.sort((a, b) => a.name.localeCompare(b.name)));
        } catch (error) {
            console.error("Error fetching buildings:", error);
            getError("Error al cargar los espacios. Por favor, inténtelo de nuevo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchSpaces();
        }, [])
    );

    const filteredClassrooms = classrooms.filter((classroom) =>
        classroom.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    const handleEdit = (classroom) => {
        navigation.navigate("EditSpace", { classroom: classroom, building: building, refresh: true});
    };

    const handleDelete = (classroom) => {
        navigation.navigate("DeleteSpace", { classroom: classroom, building: building, refresh: true });
    };

    return (
        <View className="flex-1">
            <Image
                source={require("../assets/bg.png")}
                className="absolute top-0 left-0 w-full h-full"
                style={{ width: "600%", height: "100%" }}
                resizeMode="cover"
            />

            <Header navigation={navigation} />

            <View className="m-4 ml-6 flex-row items-center">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="home" size={25} color="#000" />
                </TouchableOpacity>
                <Icon className="mr-2" name="chevron-forward-sharp" size={25} color="#000" />
                <Text className="mr-2 text-xl">Docencias</Text>
                <Icon className="mr-2" name="chevron-forward-sharp" size={25} color="#000" />
                <Text className="text-xl">{building.name}</Text>
            </View>

            {/* Search Bar */}
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />

            {loading ? (
                <Loader />
            ) : (<>
                    <FlatList
                        data={filteredClassrooms}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <ClassroomCard
                                classroom={item}
                                onEdit={() => handleEdit(item)}
                                onDelete={() => handleDelete(item)}
                            />
                        )}
                        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
                    />


                    <TouchableOpacity
                        className="absolute bottom-5 right-5 bg-[rgba(222,255,53,0.8)] w-12 h-12 rounded-full items-center justify-center shadow-sm shadow-black"
                        onPress={() => navigation.navigate("AddSpace", { building: building, refresh: true })}
                    >
                        <Icon name="add" size={30} color="#000" />
                    </TouchableOpacity>

                </>
            )}
            <StatusBar style="dark" />
        </View>
    );
};

export default SpacesScreen;