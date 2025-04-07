import React, { useCallback, useState } from "react";
import { FlatList, Modal, TouchableOpacity, View, Text, TextInput, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import { deleteUser, getUsers } from "../api/users.api";
import { useNotification } from "../context/NotificationContext";
import Loader from "../components/Loader";

const UserCard = ({ user, onEdit, onDelete }) => (
  <View style={styles.userCard}>
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{user.user}</Text>
      <View style={styles.userDetails}>
        <Text style={styles.userDetail}>{user.name} {user.lastName}</Text>
        <Text style={styles.userRole}>{user.role || "Administrador"}</Text>
      </View>
    </View>
    <View style={styles.userActions}>
      <TouchableOpacity onPress={() => onEdit(user)} style={styles.actionButton}>
        <Icon name="create-outline" size={22} color="#3b82f6" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(user)} style={styles.actionButton}>
        <Icon name="trash-outline" size={22} color="#ef4444" />
      </TouchableOpacity>
    </View>
  </View>
);

const UsersScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const { getError, getSuccess } = useNotification();
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setUsers(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("Error fetching users:", error);
      getError("Error al cargar los usuarios. Por favor, inténtelo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  const filteredUsers = users.filter((user) => 
    user.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(selectedUser._id);
      setUsers(users.filter(user => user._id !== selectedUser._id));
      setIsDeleteModalVisible(false);
      setIsSuccessModalVisible(true);
      getSuccess("Usuario desactivado correctamente");
      
      setTimeout(() => {
        setIsSuccessModalVisible(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting user:", error);
      getError("Error al desactivar el usuario");
      setIsDeleteModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f7f7f7', '#e1e8f0']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Header navigation={navigation} />

        <View style={styles.header}>
          <View style={styles.breadcrumb}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="home" size={20} color="#4b5563" />
            </TouchableOpacity>
            <Icon name="chevron-forward" size={20} color="#4b5563" style={styles.chevron} />
            <Text style={styles.title}>Administradores</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="search" size={18} color="#718096" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar administradores..."
              placeholderTextColor="#a0aec0"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.clearButton}>
                <Icon name="close-circle" size={18} color="#a0aec0" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {loading ? (
          <Loader />
        ) : (
          <>
            <FlatList
              data={filteredUsers}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => (
                <UserCard
                  user={item}
                  onEdit={(user) => navigation.navigate("EditUser", { user })}
                  onDelete={handleDelete}
                />
              )}
              contentContainerStyle={styles.listContent}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Icon name="people-outline" size={40} color="#9ca3af" />
                  <Text style={styles.emptyText}>No se encontraron usuarios</Text>
                </View>
              }
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate("AddUser")}
              activeOpacity={0.8}
            >
              <Icon name="add" size={28} color="#1f2937" />
            </TouchableOpacity>
          </>
        )}

        {/* Modal de Confirmación */}
        <Modal
          visible={isDeleteModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsDeleteModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Icon name="warning" size={40} color="#f59e0b" style={styles.modalIcon} />
              <Text style={styles.modalTitle}>Confirmar acción</Text>
              <Text style={styles.modalText}>
                ¿Estás seguro de que deseas desactivar al usuario {selectedUser?.user}?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setIsDeleteModalVisible(false)}
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

        {/* Modal de Éxito */}
        <Modal
          visible={isSuccessModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsSuccessModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Icon name="checkmark-circle" size={40} color="#10b981" style={styles.modalIcon} />
              <Text style={styles.modalTitle}>¡Éxito!</Text>
              <Text style={styles.modalText}>
                El usuario ha sido desactivado correctamente.
              </Text>
              <TouchableOpacity
                style={[styles.modalButton, styles.successButton]}
                onPress={() => setIsSuccessModalVisible(false)}
              >
                <Text style={styles.successButtonText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <StatusBar style="dark" />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    width: '100%',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 12,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  chevron: {
    marginHorizontal: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1f2937',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDetail: {
    fontSize: 14,
    color: '#4b5563',
    marginRight: 8,
  },
  userRole: {
    fontSize: 12,
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  userActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
    marginTop: 16,
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#DEFF35',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  modalIcon: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#4b5563',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
  },
  confirmButton: {
    backgroundColor: '#fee2e2',
  },
  successButton: {
    backgroundColor: '#d1fae5',
    width: '100%',
  },
  cancelButtonText: {
    color: '#4b5563',
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#b91c1c',
    fontWeight: '600',
  },
  successButtonText: {
    color: '#065f46',
    fontWeight: '600',
  },
});

export default UsersScreen;