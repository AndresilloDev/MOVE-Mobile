import { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ( {navigation} ) => {
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
      <Text className="text-2xl font-bold mb-5">Inicia sesión en MOVE</Text>
      <TextInput
        className="w-4/5 h-10 border border-gray-300 rounded-lg mb-2 p-2 bg-white"
        placeholder="Correo electrónico"
        autoCapitalize="none"
        onChangeText={(text) => setUsername(text.trim().toLowerCase())}
      />
      <TextInput
        className="w-4/5 h-10 border border-gray-300 rounded-lg mb-4 p-2 bg-white"
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Text className="w-4/5 text-right text-sm text-blue-500 mb-4" onPress={() => navigation.navigate("ForgotPassword")}>
        Olvidaste tu contraseña?
      </Text>
      <TouchableOpacity
        className="bg-primary p-3 rounded-lg mt-3 w-4/5 items-center"
        onPress={() => login(username, password)}
      >
        <Text className="text-white text-lg font-bold">Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;