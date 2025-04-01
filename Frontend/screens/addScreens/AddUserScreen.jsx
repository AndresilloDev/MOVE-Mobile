import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Modal,
    StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../../components/Header";
import { register } from "../../api/users.api";

const AddUser = () => {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleSave = async () => {
        if (!name || !lastName || !user || !password || !confirmPassword) {
            setModalMessage("Por favor, completa todos los campos.");
            setIsModalVisible(true);
            return;
        }

        if (password !== confirmPassword) {
            setModalMessage("Las contraseñas no coinciden.");
            setIsModalVisible(true);
            return;
        }

        if (password.length < 6) {
            setModalMessage("La contraseña debe tener al menos 6 caracteres.");
            setIsModalVisible(true);
            return;
        }

        try {
            const newUser = {
                name,
                lastName,
                user,
                password
            };

            const response = await register(newUser);

            if (response.error) {
                throw new Error(response.error);
            }

            setModalMessage(`Administrador ${name} ${lastName} registrado con éxito.`);
            setIsModalVisible(true);

            setName("");
            setLastName("");
            setUser("");
            setPassword("");
            setConfirmPassword("");

        } catch (error) {
            console.error("Error adding user:", error);

            const errorMessage = error.message ||
                "Error al registrar el administrador. Por favor, inténtalo de nuevo.";

            setModalMessage(errorMessage);
            setIsModalVisible(true);
        }
    };

    const handleConfirm = () => {
        setIsModalVisible(false);
        navigation.goBack();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <View className="flex-1">
            <Image
                source={require("../../assets/bg.png")}
                className="absolute top-0 left-0 w-full h-full"
                style={{ width: "600%", height: "100%" }}
                resizeMode="cover"
            />

            <Header navigation={navigation} />

            <View className="m-4 ml-6 flex-row items-center">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="home" size={25} color="#000" />
                </TouchableOpacity>
                <Icon className="mr-2" name="chevron-forward-sharp" size={25} color="#000" />
                <Text className="text-xl">Añadir Administrador</Text>
            </View>

            <View className="m-6">
                <Text className="text-lg font-bold mb-2">Nombre</Text>
                <TextInput
                    className="h-12 border border-black rounded-xl bg-white px-4 mb-4"
                    placeholder="Ej: Sebastian"
                    value={name}
                    onChangeText={setName}
                />

                <Text className="text-lg font-bold mb-2">Apellidos</Text>
                <TextInput
                    className="h-12 border border-black rounded-xl bg-white px-4 mb-4"
                    placeholder="Ej: Jimenez"
                    value={lastName}
                    onChangeText={setLastName}
                />

                <Text className="text-lg font-bold mb-2">Usuario (Correo)</Text>
                <TextInput
                    className="h-12 border border-black rounded-xl bg-white px-4 mb-4"
                    placeholder="Ej: 20233tn097@utez.edu.mx"
                    value={user}
                    onChangeText={setUser}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text className="text-lg font-bold mb-2">Contraseña</Text>
                <TextInput
                    className="h-12 border border-black rounded-xl bg-white px-4 mb-4"
                    placeholder="Mínimo 6 caracteres"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <Text className="text-lg font-bold mb-2">Confirmar Contraseña</Text>
                <TextInput
                    className="h-12 border border-black rounded-xl bg-white px-4 mb-4"
                    placeholder="Repite la contraseña"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <TouchableOpacity
                    className="bg-[rgba(222,255,53,0.8)] h-12 rounded-xl items-center justify-center"
                    onPress={handleSave}
                >
                    <Text className="text-lg font-bold">Registrar</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCancel}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {modalMessage.includes("éxito") ? "Éxito" : "Error"}
                        </Text>
                        <Text style={styles.modalMessage}>{modalMessage}</Text>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={handleCancel}
                            >
                                <Text style={styles.cancelButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                            {modalMessage.includes("éxito") && (
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.confirmButton]}
                                    onPress={handleConfirm}
                                >
                                    <Text style={styles.confirmButtonText}>Aceptar</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>

            <StatusBar style="dark" />
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    modalButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    modalButton: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: "#e0e0e0",
    },
    confirmButton: {
        backgroundColor: "#DEFF35",
    },
    cancelButtonText: {
        color: "#000",
    },
    confirmButtonText: {
        color: "#000",
    },
});

export default AddUser;