import { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";

const LoginScreen = ( {navigation} ) => {
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

		<View className="mt-40 items-center justify-center">

			<Text className="text-3xl font-bold mb-16">Inicia sesión en MOVE</Text>
			
			<TextInput
				className="w-4/5 h-10 border border-gray-500 rounded-lg mb-8 p-2 bg-white"
				placeholder="Correo electrónico"
				placeholderTextColor="#606266"
				autoCapitalize="none"
				onChangeText={(text) => setUsername(text.trim().toLowerCase())}
			/>

			<TextInput
				className="w-4/5 h-10 border border-gray-500 rounded-lg mb-2 p-2 bg-white"
				placeholder="Contraseña"
				placeholderTextColor="#606266"
				secureTextEntry
				onChangeText={setPassword}
			/>

			<Text className="w-4/5 text-right text-sm mb-8 underline" onPress={() => navigation.replace("ForgotPassword")}>
				Olvidaste tu contraseña?
			</Text>
			
			<TouchableOpacity
				className="bg-action-primary rounded-lg px-8 border-lines"
				style={{ borderWidth: 1.3, paddingVertical: 5, width: "80%" }}
				onPress={() => login(username, password)}
			>
				<Text className="text-primary text-lg text-center">Iniciar Sesión</Text>

			</TouchableOpacity>
		</View>
    </View>
  );
};

export default LoginScreen;