import React, { useState, useCallback, useEffect } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import useBLE from "../../useBLE";
import Header from "../../components/Header";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import DeviceModal from "../ConnectDeviceScreen";

const AddDeviceScreen = () => {
    const navigation = useNavigation();
    const {
        requestPermissions,
        scanForPeripherals,
        allDevices,
        connectToDevice,
        connectedDevice,
        disconnectFromDevice,
        sendWifiCredentials,
        isConnected,
        checkIfDeviceIsConnected
    } = useBLE();

    const [ssid, setSsid] = useState("");
    const [password, setPassword] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = useCallback(() => {
        setIsModalVisible(prev => !prev);
    }, []);

    const scanForDevices = useCallback(async () => {
        if (await requestPermissions()) {
            scanForPeripherals();
        }
    }, [requestPermissions, scanForPeripherals]);

    // Verificar conexión cada 5 segundos
    useEffect(() => {
        const interval = setInterval(async () => {
            const stillConnected = await checkIfDeviceIsConnected();
            if (!stillConnected) {
                disconnectFromDevice();
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [checkIfDeviceIsConnected, disconnectFromDevice]);

    return (
        <View className="flex-1 bg-gray-100">
            <Image
                source={require("../../assets/bg.png")}
                className="absolute top-0 left-0 w-full h-full"
                style={{ width: "600%", height: "100%" }}
                resizeMode="cover"
            />

            <Header navigation={navigation} />

            {/* Breadcrumb Navigation */}
            <View className="m-4 ml-6 flex-row items-center">
                <Icon name="home" size={25} color="#000" className="mr-2" />
                <Icon name="chevron-forward-sharp" size={25} color="#000" className="mr-2" />
                <Text className="text-xl">Agregar Dispositivo</Text>
            </View>

            <View className={`flex-1 items-center justify-center px-4 ${connectedDevice ? 'gap-0' : 'gap-20'}`}>
                {connectedDevice ? (
                    <>
                        <Text className="text-2xl font-bold mb-4 text-center text-black">
                            Conectado a {connectedDevice.name || "Dispositivo"}
                        </Text>

                        <TextInput
                            className="min-w-[75%] h-12 border border-gray-300 rounded-lg px-4 mb-4 bg-white text-black"
                            placeholder="SSID de la red"
                            placeholderTextColor="#606266"
                            autoCapitalize="none"
                            value={ssid}
                            onChangeText={setSsid}
                        />

                        <TextInput
                            className="min-w-[75%] h-12 border border-gray-300 rounded-lg px-4 mb-6 bg-white text-black"
                            placeholder="Contraseña"
                            placeholderTextColor="#606266"
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity
                            className="bg-action-primary py-3 rounded-xl w-[75%] items-center border border-action-hover mb-6"
                            onPress={() => sendWifiCredentials(ssid, password)}
                        >
                            <Text className="text-primary text-lg font-semibold">Enviar</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <Text className="text-2xl font-bold mb-6 text-center text-black">
                        Conéctate a un dispositivo
                    </Text>
                )}

                <View className="w-[75%] flex-row justify-between gap-4">
                    <TouchableOpacity
                        className="py-3 rounded-xl flex-1 items-center border border-black"
                        onPress={() => navigation.goBack()}
                    >
                        <Text className="text-primary text-lg text-center font-semibold">Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-action-primary py-3 rounded-xl flex-[1.2] items-center border border-action-hover"
                        onPress={
                            connectedDevice
                                ? disconnectFromDevice
                                : () => {
                                    scanForDevices();
                                    toggleModal();
                                }
                        }
                    >
                        <Text className="text-primary text-lg text-center font-semibold">
                            {connectedDevice ? "Desconectar" : "Conectar"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <DeviceModal
                closeModal={toggleModal}
                visible={isModalVisible}
                connectToPeripheral={connectToDevice}
                devices={allDevices}
            />
        </View>
    );
};

export default AddDeviceScreen;