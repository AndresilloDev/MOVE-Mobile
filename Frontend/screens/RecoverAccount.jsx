import { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";

const RecoverAccount = ( {navigation} ) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1">

        <Image
            source={require("../assets/bg.png")} 
            className="absolute top-0 left-0 w-fill h-full" 
            style={{ width: "600%", height: "100%"}}
            resizeMode="cover" 
      	/>

        <Header navigation={navigation} />

      <View className="mt-80 items-center justify-center">
      <Text className="text-2xl font-bold mb-5">Recupera tu cuenta</Text>
      <TextInput
        className="w-4/5 h-10 border border-gray-500 rounded-lg mb-2 p-2 bg-white"
        placeholder="Correo electrónico"
        placeholderTextColor="#606266"
        autoCapitalize="none"
        onChangeText={(text) => setUsername(text.trim().toLowerCase())}
      />
      <Text className="w-4/5 text-right text-sm text-primary underline mb-4" onPress={() => navigation.navigate("Login")}>
        Ya tienes una cuenta?
      </Text>

      <TouchableOpacity
				className="bg-action-primary rounded-lg px-8 border-lines"
				style={{ borderWidth: 1.3, paddingVertical: 5, width: "80%" }}
				onPress={() => navigation.navigate("CodeVerification")}
			>
				<Text className="text-primary text-lg text-center">Enviar Código</Text>

			</TouchableOpacity>
      </View>
    </View>
  );
};

export default RecoverAccount;