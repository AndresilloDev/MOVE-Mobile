import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { createBuilding } from "../../api/buildings.api";
import { useNotification } from "../../context/NotificationContext";
import { useNavigation } from "@react-navigation/native";

const AddBuildingScreen = async () => {
    const [buildingName, setBuildingName] = useState("");
    const { getSuccess, getError } = useNotification();
    const navigation = useNavigation();

    const handleAddBuilding = async () => {
        try {
            const response = await createBuilding(building);
            if (response.status === 201) {
                getSuccess("Edificio agregado correctamente.");
                navigation.goBack();
            } else {
                getError("Error al agregar el edificio. Por favor, inténtelo de nuevo más tarde.");
            }
        } catch (error) {
            getError("Error al agregar el edificio. Por favor, inténtelo de nuevo más tarde.");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agregar Edificio</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre del Edificio"
                value={buildingName}
                onChangeText={(text) => setBuildingName(text)}
            />
            <Button title="Agregar" onPress={() => handleAddBuilding(building)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
});

export default AddBuildingScreen;