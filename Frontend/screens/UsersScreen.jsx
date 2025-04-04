import React, {useEffect, useState} from "react";
import {FlatList, Image, Modal, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import {deleteUser, getUsers} from "../api/users.api";

const UserCard = ({ user, onEdit, onDelete }) => (
    <View className="bg-white p-4 rounded-lg shadow-md flex-row justify-between mb-4 mx-6">
        <View className="flex-1">
            <Text className="font-bold mb-1">Usuario: {user.user}</Text>
            <Text className="mb-1">Nombre: {user.name} {user.lastName}</Text>
            <Text className="mb-1">Tipo: {user.isSuperAdmin ? "Super Admin" : "Admin"}</Text>
            <Text>Estado: {user.status ? "Activo" : "Inactivo"}</Text>
        </View>
        <View className="flex flex-row space-x-2 items-center">
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
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [showActiveOnly, setShowActiveOnly] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        const unsubscribe = navigation.addListener('focus', () => {
            fetchUsers();
        });

        return unsubscribe;
    }, [navigation]);

    const filteredUsers = users.filter((user) => {
        const matchesSearch = user.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = showActiveOnly ? user.status : true;
        return matchesSearch && matchesStatus;
    });

    const handleEdit = (user) => {
        navigation.navigate("EditUser", { user });
    };

    const handleDelete = (user) => {
        setSelectedUser(user);
        setIsDeleteModalVisible(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteUser(selectedUser._id);
            setUsers(users.map(user =>
                user._id === selectedUser._id ? {...user, status: false} : user
            ));
            setIsDeleteModalVisible(false);
            setIsSuccessModalVisible(true);

            setTimeout(() => {
                setIsSuccessModalVisible(false);
            }, 3000);
        } catch (error) {
            console.error("Error deleting user:", error);
            setIsDeleteModalVisible(false);
        }
    };

    const cancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleSuccessOk = () => {
        setIsSuccessModalVisible(false);
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

            <View className="mx-6 mt-2 flex-row items-center justify-between">
                <Text>Mostrar solo activos</Text>
                <Switch
                    value={showActiveOnly}
                    onValueChange={setShowActiveOnly}
                    trackColor={{ false: "#767577", true: "#DEFF35" }}
                />
            </View>

            <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <UserCard
                        user={item}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
                contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
                ListEmptyComponent={
                    <View className="items-center mt-10">
                        <Text>No se encontraron usuarios</Text>
                    </View>
                }
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
                        <Text style={styles.modalTitle}>Desactivar Administrador</Text>
                        <Text style={styles.modalMessage}>
                            ¿Estás seguro de que deseas desactivar al administrador {selectedUser?.user}?
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
                                <Text style={styles.confirmButtonText}>Desactivar</Text>
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
                            Administrador {selectedUser?.user} desactivado.
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