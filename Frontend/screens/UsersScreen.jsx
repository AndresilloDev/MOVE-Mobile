import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    Modal,
    StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";

const users = [
    { id: 129340, username: "20233tn097@utez", name: "Sebastian", surname: "Jimenez" },
    { id: 129341, username: "20233tn098@utez", name: "Carlos", surname: "Hernandez" },
    { id: 129342, username: "20233tn099@utez", name: "Maria", surname: "Lopez" },
    { id: 129343, username: "20233tn100@utez", name: "Ronal", surname: "Dinho" },
    { id: 129344, username: "20233tn101@utez", name: "Cesar", surname: "Rin" },
    { id: 129345, username: "20233tn102@utez", name: "Erikiti", surname: "Rijillo" },
];

const UserCard = ({ user, onEdit, onDelete }) => (
    <View className="bg-white p-4 rounded-lg shadow-md flex-row justify-between mb-4 mx-6">
        <View>
            <Text className="font-bold mb-2">Usuario: {user.username}</Text>
            <Text>Nombre: {user.name} {user.surname}</Text>
        </View>
        <View className="flex flex-row space-x-2 items-end">
            <TouchableOpacity onPress={() => onEdit(user)}>
                <Icon name="create-outline" size={24} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(user)}>
                <Icon name="trash-outline" size={24} color="#F44336" />
            </TouchableOpacity>
        </View>
    </View>
);

const UsersScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState("");
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [selectedUser , setSelectedUser ] = useState(null);

    let timeoutId;

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (user) => {
        navigation.navigate("EditUser", { user });
    };

    const handleDelete = (user) => {
        setSelectedUser (user);
        setIsDeleteModalVisible(true);
    };

    const confirmDelete = () => {
        setIsDeleteModalVisible(false);
        setIsSuccessModalVisible(true);

        timeoutId = setTimeout(() => {
            setIsSuccessModalVisible(false);
        }, 3000);
    };

    const cancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleSuccessOk = () => {
        setIsSuccessModalVisible(false);
        clearTimeout(timeoutId);
    };

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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="home" size={25} color="#000" />
                </TouchableOpacity>
                <Icon className="mr-2" name="chevron-forward-sharp" size={25} color="#000" />
                <Text className="mr-2 text-xl">Administradores</Text>
            </View>

            <View className="items-center mt-2 py-2 px-1">
                <View className="flex-row items-center w-11/12 h-10 border border-black rounded-xl bg-white">
                    <TextInput
                        className="flex-1 h-full pl-3"
                        placeholder="Buscar usuario..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity
                        className="bg-[rgba(222,255,53,0.8)] w-10 h-full justify-center items-center rounded-r-xl"
                    >
                        <Icon name="search" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <UserCard
                          user={item}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                    />
                )}
                contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
            />

            <TouchableOpacity
                className="absolute bottom-5 right-5 bg-[rgba(222,255,53,0.8)] w-12 h-12 rounded-full items-center justify-center shadow-sm shadow-black"
                onPress={() => navigation.navigate("AddUser")}
            >
                <Icon name="add" size={30} color="#000" />
            </TouchableOpacity>

            <Modal
                visible={isDeleteModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={cancelDelete}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Eliminar Administrador</Text>
                        <Text style={styles.modalMessage}>
                            ¿Estás seguro de que deseas eliminar al administrador {selectedUser?.username}?
                        </Text>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={cancelDelete}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={confirmDelete}
                            >
                                <Text style={styles.confirmButtonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={isSuccessModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={handleSuccessOk}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Éxito</Text>
                        <Text style={styles.modalMessage}>
                            Administrador {selectedUser ?.username} eliminado.
                        </Text>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.confirmButton]}
                            onPress={handleSuccessOk}
                        >
                            <Text style={styles.confirmButtonText}>Aceptar</Text>
                        </TouchableOpacity>
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
        color: "#000",
    },
    modalMessage: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
        color: "#000",
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

export default UsersScreen;