import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UsersScreen from "../screens/UsersScreen";
import AddUser from "../screens/AddUser";
import EditUser from "../screens/EditUser";

const Stack = createNativeStackNavigator();

export default function StackNavigatorUsers() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UsersScreen"
                component={UsersScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddUser"
                component={AddUser}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditUser"
                component={EditUser}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
