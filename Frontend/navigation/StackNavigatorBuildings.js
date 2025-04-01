import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BuildingsScreen from "../screens/BuildingsScreen";
import SpacesScreen from "../screens/ClassroomsScreen";
import AddSpaceScreen from "../screens/addScreens/AddSpaceScreen";
import EditSpaceScreen from "../screens/editScreens/EditSpaceScreen";
import AddBuildingScreen from "../screens/addScreens/AddBuildingScreen";
import EditBuildingScreen from "../screens/editScreens/EditBuildingScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigatorBuildings() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Buildings"
                component={BuildingsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddBuilding"
                component={AddBuildingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditBuilding"
                component={EditBuildingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Spaces"
                component={SpacesScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddSpace"
                component={AddSpaceScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditSpace"
                component={EditSpaceScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
