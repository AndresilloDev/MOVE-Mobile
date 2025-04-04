import {useMemo, useState} from "react";
import {BleManager} from "react-native-ble-plx";
import {PermissionsAndroid, Platform} from "react-native";
import * as ExpoDevice from "expo-device";
import base64 from "react-native-base64"

const SERVICE_UUID = "0000FFE0-0000-1000-8000-00805F9B34FB";
const CHARACTERISTIC_UUID = "0000FFE1-0000-1000-8000-00805F9B34FB";

function useBLE() {
    const bleManager = useMemo(() => new BleManager(), []);
    const [allDevices, setAllDevices] = useState([]);
    const [connectedDevice, setConnectedDevice] = useState(null);
    const [characteristic, setCharacteristic] = useState(null);

    const requestAndroid31Permissions = async () => {
        const bluetoothScanPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            {
                title: "Scan Permission",
                message: "App requires Bluetooth Scanning",
                buttonPositive: "OK",
            }
        );
        const bluetoothConnectPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            {
                title: "Connect Permission",
                message: "App requires Bluetooth Connecting",
                buttonPositive: "OK",
            }
        );
        const bluetoothFineLocationPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Fine Location",
                message: "App requires fine location",
                buttonPositive: "OK",
            }
        );

        return (
            bluetoothScanPermission === "granted" &&
            bluetoothConnectPermission === "granted" &&
            bluetoothFineLocationPermission === "granted"
        );
    };

    const requestPermissions = async () => {
        if (Platform.OS === "android") {
            if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message: "Bluetooth Low Energy requires Location",
                        buttonPositive: "OK",
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } else {
                return await requestAndroid31Permissions();
            }
        } else {
            return true;
        }
    };

    const isDuplicateDevice = (devices, nextDevice) => devices.findIndex((device) => nextDevice.id === device.id) > -1;

    const scanForPeripherals = () => {
        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log(error);
            }

            if (device && (device.localName) && device.isConnectable === true) {
                console.log(device);
                setAllDevices((prevState) => {
                    if (!isDuplicateDevice(prevState, device)) {
                        return [...prevState, device];
                    }
                    return prevState;
                });
            }
        });
    };

    const connectToDevice = async (device) => {
        try {
            const deviceConnection = await bleManager.connectToDevice(device.id);
            setConnectedDevice(deviceConnection);
            await deviceConnection.discoverAllServicesAndCharacteristics();
            bleManager.stopDeviceScan();

            const services = await deviceConnection.services();
            for (const service of services) {
                console.log("Servicio encontrado:", service.uuid);
                if (service.uuid.toLowerCase() === SERVICE_UUID.toLowerCase()) {
                    const characteristics = await service.characteristics();
                    for (const char of characteristics) {
                        console.log("Característica encontrada:", char.uuid);
                        if (char.uuid.toLowerCase() === CHARACTERISTIC_UUID.toLowerCase()) {
                            setCharacteristic(char);
                            console.log("Característica asignada correctamente:", char.uuid);
                            return;
                        }
                    }
                }
            }
            console.log("No se encontró la característica correcta.");
        } catch (e) {
            console.log("Error en la conexión", e);
        }
    };

    const disconnectFromDevice = () => {
        if (connectedDevice) {
            bleManager.cancelDeviceConnection(connectedDevice.id);
            setConnectedDevice(null);
        }
    }

    const sendWifiCredentials = (ssid, password) => {
        const wifiData = `${ssid}|${password}`;
        const wifiDataBase64 = base64.encode(wifiData);
        console.log("Intentando enviar datos:", wifiData);

        if (!characteristic) {
            console.log("Error: `characteristic` es `null` o `undefined`.");
            return;
        }

        try {
            characteristic.writeWithResponse(wifiDataBase64);
            console.log("Credenciales WiFi enviadas:", wifiDataBase64);
        } catch (error) {
            console.log("Error al enviar los datos:", error);
        }
    };

    return {
        scanForPeripherals,
        requestPermissions,
        allDevices,
        connectToDevice,
        connectedDevice,
        disconnectFromDevice,
        sendWifiCredentials
    };
}

export default useBLE;