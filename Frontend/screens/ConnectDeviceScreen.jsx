import React, { useCallback } from "react";
import {
    FlatList,
    Modal,
    Text,
    TouchableOpacity,
    View,
    Image,
} from "react-native";

const DeviceModalListItem = ({ item, connectToPeripheral, closeModal }) => {
    const connectAndCloseModal = useCallback(() => {
        connectToPeripheral(item);
        closeModal();
    }, [closeModal, connectToPeripheral, item]);

    return (
        <TouchableOpacity
            onPress={connectAndCloseModal}
            className="bg-action-primary px-4 py-4 rounded-2xl mb-4 w-full items-center border border-action-hover"
        >
            <Text className="text-primary text-lg font-semibold">
                {item.name || "Unknown Device"}
            </Text>
        </TouchableOpacity>
    );
};

const ConnectDeviceScreen = ({ devices = [], visible, connectToPeripheral, closeModal }) => {
    const renderDeviceModalListItem = ({ item }) => (
        <DeviceModalListItem
            item={item}
            connectToPeripheral={connectToPeripheral}
            closeModal={closeModal}
        />
    );

    return (
        <Modal animationType="slide" transparent={false} visible={visible}>
            <Image
                source={require("../assets/bg.png")}
                className="absolute top-0 left-0 w-full h-full"
                style={{ width: "600%", height: "100%" }}
                resizeMode="cover"
            />

            <View className="flex-1 items-center justify-center">
                <View className="w-[70%] items-center">
                    <Text className="text-2xl font-bold text-center text-black mb-10">
                        Conéctate a un dispositivo
                    </Text>

                    {devices.length > 0 ? (
                        <FlatList
                            className="w-full"
                            contentContainerStyle={{ paddingBottom: 20 }}
                            data={devices}
                            keyExtractor={(item) => item.id}
                            renderItem={renderDeviceModalListItem}
                        />
                    ) : (
                        <View className="items-center justify-center py-10">
                            <Text className="text-gray-500 text-base">No se encontraron dispositivos</Text>
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={closeModal}
                        className="mt-4 py-3 px-6 rounded-xl border border-black w-full items-center"
                    >
                        <Text className="text-primary text-lg font-semibold">Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ConnectDeviceScreen;