import React from "react";
import { View, Text, Button } from "react-native";

export default function LoginScreen({ navigation }) {
  const handleLogin = () => {
    navigation.replace("HomePage");
};

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Iniciar sesión</Text>
      <Button title="Iniciar sesión" /*onPress={handleLogin}*//>
    </View>
  );
}
