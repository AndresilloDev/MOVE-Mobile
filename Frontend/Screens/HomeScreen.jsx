import { Button, Image, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ setIsAuthenticated }) => {
    return (
        <SafeAreaView className="bg-white">
            <View className="h-[40px] bg-white flex justify-end items-start shadow-md">
                <Image
                    source={require("../assets/logo.png")}
                    className="w-32 h-10"
                />
            </View>
            <View>
                <Text>Home</Text>
                <Button title="Iniciar sesión" onPress={() => setIsAuthenticated(true)} />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;