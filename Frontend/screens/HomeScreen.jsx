import {Image, Text, View} from "react-native";
import Header from "../components/Header";

const HomeScreen = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white">
        <Image
            source={require("../assets/bg.png")} 
            className="absolute top-0 left-0 w-fill h-full" 
            style={{ width: "600%", height: "100%"}}
            resizeMode="cover" 
        />

        <Header navigation={navigation} />

        <View className="mt-16 justify-center items-center px-6">

            <Text className="text-primary text-center text-5xl font-bold mb-16">
            MONITOR DE VARIABLES DE ENTORNO
            </Text>

            <Image
            source={require("../assets/dashboard.png")}
            className="mb-16 rounded-lg"
            style={{
                width: "90%",
                height: 200,
                resizeMode: "contain",
            }}
            />

            <Text className="text-primary text-justify text-1xl w-11/12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis, eros sit amet tincidunt tempor, purus libero ultricieslibero, ut posuere nulla felis nec justo.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum nostrum corporis voluptates accusantium, et qui illum tenetur cum a. 
            </Text>
        </View>
    </View>
  );
};

export default HomeScreen;
