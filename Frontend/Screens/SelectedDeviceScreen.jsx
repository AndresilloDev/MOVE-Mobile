import { Image, Text, View } from "react-native";
import SensorCard from "../components/SensorCard";

const SelectedDeviceScreen = () => {
    return (
        <View className="flex items-center w-full h-full bg-white">
            <Image
                source={require("../assets/fondo.jpg")} 
                className="absolute w-full h-full opacity-30"
                resizeMode="cover"
            />
            <Text>oa</Text>
            <SensorCard />
        </View>
    );
};

export default SelectedDeviceScreen;
