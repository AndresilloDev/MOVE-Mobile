import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";

const ClassroomsPage = () => {
  const navigation = useNavigation();

  const classrooms = [
    { id: 'CC11', devices: 8 },
    { id: 'CC12', devices: 8 },
    { id: 'CC13', devices: 8 },
    { id: 'CC14', devices: 8 },
  ];

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/fondo.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.searchSection}>
          <View style={styles.homeContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Icon name="home" style={styles.homeIcon} />
            </TouchableOpacity>
            <Text style={styles.title}>Docencias - D4</Text>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar..."
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => console.log("Buscar")}
            >
              <Icon name="search" style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.classroomsContainer}>
          {classrooms.map((classroom, index) => (
            <TouchableOpacity
              key={index}
              style={styles.classroomCard}
              onPress={() => navigation.navigate("ClassroomDetails", { classroom })}
            >
              <View style={styles.classroomContent}>
                <View>
                  <Text style={styles.classroomName}>Nombre: {classroom.id}</Text>
                  <Text style={styles.classroomDevices}>Dispositivos registrados: {classroom.devices}</Text>
                </View>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity onPress={() => console.log("Editar")} style={styles.actionButton}>
                    <Icon name="create" style={styles.actionIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log("Eliminar")}>
                    <Icon name="trash" style={styles.actionIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddDevice")}
      >
        <Icon name="add" style={styles.addIcon} />
      </TouchableOpacity>

      <StatusBar style="dark" />
    </View>
  );
};

// csss
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  logo: {
    width: 60,
    height: 60,
  },
  searchSection: {
    padding: 16,
  },
  homeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 25,
  },
  homeIcon: {
    fontSize: 25,
    color: '#000',
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#DEFF35',
    borderRadius: 10,
    padding: 10,
  },
  searchIcon: {
    fontSize: 20,
    color: '#000',
  },
  classroomsContainer: {
    paddingHorizontal: 16,
  },
  classroomCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  classroomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  classroomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  classroomDevices: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 10,
  },
  actionIcon: {
    fontSize: 24,
    color: '#000',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(222, 255, 53, 0.8)',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addIcon: {
    fontSize: 30,
    color: '#000',
  },
});

export default ClassroomsPage;