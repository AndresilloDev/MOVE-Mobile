import { View, Image, TouchableOpacity, Text, Platform } from "react-native";
import React, { useContext } from "react";
import { useRoute } from "@react-navigation/native"; // Importar el hook para obtener la ruta actual
import { AuthContext } from "../context/AuthContext";

const Header = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const route = useRoute();

  const isLandingPage = route.name === "Home";

  return (
    <View
      className="h-[90px] bg-header flex-row items-center justify-between px-4 pt-12"
      style={{
        ...Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          android: {
            elevation: 5,
          },
        }),
      }}
    >
      {/* Logo */}
      <Image
        source={require("../assets/logo.png")}
        className="w-32 h-10 ml-4 mb-2"
      />

      {isLandingPage && !user && (
        <TouchableOpacity
          className="bg-action-primary rounded-lg px-4 border-lines"
          style={{ borderWidth: 1.3, paddingVertical: 7 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text className="text-primary text-center">Iniciar sesión</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;