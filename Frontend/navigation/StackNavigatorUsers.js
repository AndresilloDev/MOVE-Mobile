import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import UsersScreen from "../screens/UsersScreen";
import AddUserScreen from "../screens/addScreens/AddUserScreen";
import EditUserScreen from "../screens/editScreens/EditUserScreen";
import DeleteUserScreen from "../screens/deleteScreens/DeleteUserScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigatorUsers() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Users"
                component={UsersScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddUser"
                component={AddUserScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditUser"
                component={EditUserScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DeleteUser"
                component={DeleteUserScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
