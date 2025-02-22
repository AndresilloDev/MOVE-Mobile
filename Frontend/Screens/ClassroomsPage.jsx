import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";

const ClassroomsPage = () => {
  const navigation = useNavigation();

  const classrooms = [
    { id: 'CC11', devices: 8 },
    { id: 'CC12', devices: 8 },
    { id: 'CC13', devices: 8 },
    { id: 'CC14', devices: 8 },
  ];

  return (
    <View className="flex-1 relative">
      <Image
        source={require("../assets/fondo.jpg")}
        className="absolute w-full h-full opacity-30"
        resizeMode="cover"
      />

      <ScrollView className="flex-1">
        <View className="h-16 flex-row items-center px-4 border-b border-gray-300">
          <Image
            source={require("../assets/logo.png")}
            className="w-[40px] h-[40px]" 
            resizeMode="contain"
          />
        </View>

        <View className="p-4">
          <View className="flex-row items-center ml-2.5 mb-6">
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Icon name="home" size={25} color="#000" /> 
            </TouchableOpacity>
            <Text className="text-xl ml-2.5">Docencias - D4</Text>
          </View>
          <View className="flex-row items-center bg-white rounded-lg px-2.5">
            <TextInput
              className="flex-1 py-2 px-2.5"
              placeholder="Buscar..."
            />
            <TouchableOpacity
              className="bg-[#DEFF35] rounded-lg p-2.5"
              onPress={() => console.log("Buscar")}
            >
              <Icon name="search" size={20} color="#000" /> 
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-4">
          {classrooms.map((classroom, index) => (
            <TouchableOpacity
              key={index}
              className="mb-4 p-4 bg-white rounded-lg shadow-sm shadow-black"
              onPress={() => navigation.navigate("ClassroomDetails", { classroom })}
            >
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-lg font-bold text-gray-800">Nombre: {classroom.id}</Text>
                  <Text className="text-base text-gray-600 mt-2">Dispositivos registrados: {classroom.devices}</Text>
                </View>
                <View className="flex-row">
                  <TouchableOpacity onPress={() => console.log("Editar")} className="mr-2.5">
                    <Icon name="create" size={24} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log("Eliminar")}>
                    <Icon name="trash" size={24} color="#000" /> 
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 right-5 bg-[rgba(222,255,53,0.8)] w-12 h-12 rounded-full items-center justify-center shadow-sm shadow-black"
        onPress={() => navigation.navigate("AddDevice")}
      >
        <Icon name="add" size={30} color="#000" /> 
      </TouchableOpacity>

      <StatusBar style="dark" />
    </View>
  );
};

export default ClassroomsPage;