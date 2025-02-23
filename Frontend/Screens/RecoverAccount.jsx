import { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";

const RecoverAccount = ( {navigation} ) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
          <Image
            source={require("../assets/fondo.jpg")} 
            className="absolute w-full h-full opacity-30" 
            resizeMode="cover" 
          />
      <Text className="text-2xl font-bold mb-5">Recupera tu cuenta</Text>
      <TextInput
        className="w-4/5 h-10 border border-gray-300 rounded-lg mb-2 p-2 bg-white"
        placeholder="Correo electrónico"
        autoCapitalize="none"
        onChangeText={(text) => setUsername(text.trim().toLowerCase())}
      />
      <Text className="w-4/5 text-right text-sm text-blue-500 mb-4" onPress={() => navigation.navigate("Login")}>
        Ya tienes una cuenta?
      </Text>
      <TouchableOpacity
        className="bg-primary p-3 rounded-lg mt-3 w-4/5 items-center"
        onPress={() => navigation.navigate("CodeVerification")}
      >
        <Text className="text-white text-lg font-bold">Enviar código</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecoverAccount;