import React, { useState, useCallback } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import DeviceModal from "../DeviceModal";
import useBLE from "../../useBLE";

const AddDeviceScreen = () => {
    const {
        requestPermissions,
        scanForPeripherals,
        allDevices,
        connectToDevice,
        connectedDevice,
        disconnectFromDevice,
        sendWifiCredentials
    } = useBLE();

    const [ssid, setSsid] = useState("");
    const [password, setPassword] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const scanForDevices = useCallback(async () => {
        if (await requestPermissions()) {
            scanForPeripherals();
        }
    }, [requestPermissions, scanForPeripherals]);

    const toggleModal = useCallback(() => {
        setIsModalVisible((prev) => !prev);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heartRateTitleWrapper}>
                {connectedDevice ? (
                    <>
                        <Text style={styles.heartRateTitleText}>ME CONECTE A {allDevices[0].name}</Text>
                        <TextInput
                            className="w-4/5 h-10 border border-gray-500 rounded-lg mb-8 p-2 bg-white"
                            placeholder="SSID de la red"
                            placeholderTextColor="#606266"
                            autoCapitalize="none"
                            onChangeText={setSsid}
                        />
                        <TextInput
                            className="w-4/5 h-10 border border-gray-500 rounded-lg mb-2 p-2 bg-white"
                            placeholder="Contraseña"
                            placeholderTextColor="#606266"
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            className="bg-action-primary rounded-lg px-8 border-lines"
                            style={{ borderWidth: 1.3, paddingVertical: 5, width: "80%" }}
                            onPress={() => sendWifiCredentials(ssid, password)}
                        >
                            <Text className="text-primary text-lg text-center">Enviar</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <Text style={styles.heartRateTitleText}>
                        Please Connect to a Heart Rate Monitor
                    </Text>
                )}
            </View>
            <TouchableOpacity
                onPress={connectedDevice ? disconnectFromDevice : () => {
                    scanForDevices();
                    toggleModal();
                }}
                style={styles.ctaButton}
            >
                <Text style={styles.ctaButtonText}>
                    {connectedDevice ? "Disconnect" : "Connect"}
                </Text>
            </TouchableOpacity>
            <DeviceModal
                closeModal={toggleModal}
                visible={isModalVisible}
                connectToPeripheral={connectToDevice}
                devices={allDevices}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    heartRateTitleWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    heartRateTitleText: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginHorizontal: 20,
        color: "black",
    },
    heartRateText: {
        fontSize: 25,
        marginTop: 15,
    },
    ctaButton: {
        backgroundColor: "#FF6060",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        marginHorizontal: 20,
        marginBottom: 5,
        borderRadius: 8,
    },
    ctaButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
});

export default AddDeviceScreen;