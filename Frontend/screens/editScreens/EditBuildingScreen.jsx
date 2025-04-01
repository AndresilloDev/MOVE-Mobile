import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { updateBuilding } from "../../api/buildings.api";
import { useNotification } from "../../context/NotificationContext";

export const EditBuildingScreen = () => {
    const navigation = useNavigation();
    const { building } = route.params;
    const [name, setName] = useState(building.name);
    const { getSuccess, getError } = useNotification();

    const handleEdit = async () => {
        try {
            const response = await updateBuilding(building.id, { name });
            if (response.status === 200) {
                getSuccess("Edificio editado correctamente.");
            } else {
                getError("Error al editar el edificio. Por favor, inténtelo de nuevo más tarde.");
            }
        } catch (error) {
            getError("Error al editar el edificio. Por favor, inténtelo de nuevo más tarde.");
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Building</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre del Edificio"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <Button
                title="Guardar Cambios"
                onPress={() => handleEdit}
            />
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

export default EditBuildingScreen;