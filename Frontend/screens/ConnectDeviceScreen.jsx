import React, {useCallback} from "react";
import {FlatList, Image, SafeAreaView, Text, TouchableOpacity, View,} from "react-native";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/Ionicons";

const DeviceListItem = ({ item, connectToPeripheral, navigation }) => {
    const connect = useCallback(() => {
        connectToPeripheral(item);
        navigation.goBack();
    }, [connectToPeripheral, item, navigation]);

    return (
        <TouchableOpacity onPress={connect} className="bg-red-500 justify-center items-center h-12 w-full mb-2 rounded-lg">
            <Text className="text-lg font-bold text-white">{item.name || "Unknown Device"}</Text>
        </TouchableOpacity>
    );
};

const ConnectDeviceScreen = ({ devices = [], connectToPeripheral, navigation }) => {
    const renderDeviceListItem = ({ item }) => (
        <DeviceListItem item={item} connectToPeripheral={connectToPeripheral} navigation={navigation} />
    );

    return (
        <View className="flex-1">
            <Image
                source={require("../assets/bg.png")}
                className="absolute top-0 left-0 w-full h-full"
                style={{ width: "600%", height: "100%" }}
                resizeMode="cover"
            />

            <Header navigation={navigation} />

            <View className="m-4 ml-6 flex-row items-center">
                <Icon className="mr-2" name="home" size={25} color="#000" />
                <Icon className="mr-2" name="chevron-forward-sharp" size={25} color="#000" />
                <Text className="text-xl">Conectar Dispositivo</Text>
            </View>

            <SafeAreaView className="flex-1 items-center justify-center p-5">
                {devices.length > 0 ? (
                    <FlatList
                        data={devices}
                        keyExtractor={(item) => item.id}
                        renderItem={renderDeviceListItem}
                    />
                ) : (
                    <View className="flex items-center justify-center p-5">
                        <Text className="text-lg text-gray-500">No devices found</Text>
                    </View>
                )}
            </SafeAreaView>
            <TouchableOpacity onPress={() => navigation.goBack()} className="bg-action-primary rounded-lg px-8 border-lines p-2 m-8 self-center">
                <Text className="text-primary text-lg text-center font-bold">Regresar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ConnectDeviceScreen;