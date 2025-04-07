import React, { useCallback, useState } from "react";
import { FlatList, TouchableOpacity, View, StyleSheet, Text, TextInput} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import { getBuildings } from "../api/buildings.api";
import { useNotification } from "../context/NotificationContext";
import Loader from "../components/Loader";

const BuildingCard = ({ building, navigation, onEdit, onDelete }) => (
  <TouchableOpacity
    style={styles.buildingCard}
    onPress={() => navigation.navigate("Spaces", { building })}
    activeOpacity={0.8}
  >
    <View style={styles.buildingInfo}>
      <Text style={styles.buildingName}>{building.name}</Text>
      <View style={styles.buildingStats}>
        <View style={styles.statItem}>
          <Icon name="hardware-chip-outline" size={16} color="#4b5563" />
          <Text style={styles.statText}>{building.deviceCount} Dispositivos</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="business-outline" size={16} color="#4b5563" />
          <Text style={styles.statText}>{building.spaceCount} Aulas</Text>
        </View>
      </View>
    </View>
    <View style={styles.buildingActions}>
      <TouchableOpacity onPress={() => onEdit(building)} style={styles.actionButton}>
        <Icon name="create-outline" size={22} color="#3b82f6" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(building)} style={styles.actionButton}>
        <Icon name="trash-outline" size={22} color="#ef4444" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const BuildingsScreen = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { getError } = useNotification();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBuildings = async () => {
    try {
      setLoading(true);
      const response = await getBuildings();
      setBuildings(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("Error fetching buildings:", error);
      getError("Error al cargar los edificios. Por favor, inténtelo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBuildings();
    }, [])
  );

  const filteredBuildings = buildings.filter((building) =>
    building.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleEdit = (building) => {
    navigation.navigate("EditBuilding", { building: building });
  };

  const handleDelete = (building) => {
    navigation.navigate("DeleteBuilding", { building: building });
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
            <Icon name="home" size={20} color="#4b5563" />
            <Icon name="chevron-forward" size={20} color="#4b5563" style={styles.chevron} />
            <Text style={styles.title}>Docencias</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="search" size={18} color="#718096" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar edificios..."
              placeholderTextColor="#a0aec0"
              value={searchQuery}
              onChangeText={handleSearch}
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
              data={filteredBuildings}
              keyExtractor={(item) => item._id}
              renderItem={({item}) => (
                <BuildingCard
                  building={item}
                  navigation={navigation}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
              contentContainerStyle={styles.listContent}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Icon name="business-outline" size={40} color="#9ca3af" />
                  <Text style={styles.emptyText}>No se encontraron edificios</Text>
                </View>
              }
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate("AddBuilding")}
              activeOpacity={0.8}
            >
              <Icon name="add" size={28} color="#1f2937" />
            </TouchableOpacity>
          </>
        )}
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
  buildingCard: {
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
  buildingInfo: {
    flex: 1,
  },
  buildingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  buildingStats: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 14,
    color: '#4b5563',
    marginLeft: 4,
  },
  buildingActions: {
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
});

export default BuildingsScreen;