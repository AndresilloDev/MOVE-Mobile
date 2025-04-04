import React, {useState} from "react";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {updateSpace} from "../../api/spaces.api";
import {useNotification} from "../../context/NotificationContext";
import Header from "../../components/Header";
import Icon from "react-native-vector-icons/Ionicons";

const EditSpaceScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { building, classroom } = route.params;
  const { getError, getSuccess } = useNotification();
  const [classroomName, setClassroomName] = useState(classroom.name);

  const handleSave = async () => {
    if (!classroomName) {
      getError("Por favor, complete todos los campos.");
      return;
    }

    try {
      await updateSpace(building._id, classroom._id, { name: classroomName });
      getSuccess("Aula editada correctamente.");
      navigation.goBack();
    } catch (error) {
      getError("Error al editar el aula. Por favor, inténtelo de nuevo.");
    }
  };

  return (
      <View className="flex-1 bg-gray-100">
        {/* Background */}
        <Image
            source={require("../../assets/bg.png")}
            className="absolute top-0 left-0 w-full h-full"
            style={{ width: "600%", height: "100%" }}
            resizeMode="cover"
        />

        <Header navigation={navigation} />

        {/* Breadcrumb Navigation */}
        <View className="m-4 ml-6 flex-row items-center">
          <Icon name="home" size={25} color="#000" className="mr-2" />
          <Icon name="chevron-forward-sharp" size={25} color="#000" className="mr-2" />
          <Text className="text-xl">{building.name}</Text>
          <Icon name="chevron-forward-sharp" size={25} color="#000" className="mr-2" />
          <Text className="text-xl">Editar Aula</Text>
        </View>

        {/* Form */}
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-2xl font-bold mb-4 text-center">Editar Aula</Text>

          <TextInput
              className="min-w-[75%] h-12 border border-gray-300 rounded-lg px-4 mb-6 bg-white"
              placeholder="Nombre del Aula"
              value={classroomName}
              onChangeText={setClassroomName}
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
                onPress={handleSave}
            >
              <Text className="text-primary text-lg text-center font-semibold">Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};

export default EditSpaceScreen;