import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import Header from "../components/Header";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";

const RecoverAccount = ( {navigation} ) => {
    const { handleRecoverPassword } = useContext(AuthContext);
    const [user, setUser] = useState("");

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
        onChangeText={(text) => setUser(text.trim().toLowerCase())}
      />
      <Text className="w-4/5 text-right text-sm text-primary underline mb-4" onPress={() => navigation.navigate("Login")}>
        Ya tienes una cuenta?
      </Text>

      <TouchableOpacity
          className="bg-action-primary rounded-lg px-8 border border-action-hover py-1 w-[80%]"
          onPress={() => handleRecoverPassword(user)}>
				<Text className="text-primary text-lg text-center">Enviar Código</Text>

			</TouchableOpacity>
      </View>
    </View>
  );
};

export default RecoverAccount;