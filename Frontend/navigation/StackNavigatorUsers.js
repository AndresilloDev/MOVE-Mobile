import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UsersScreen from "../screens/UsersScreen";
import AddUser from "../screens/addScreens/AddUserScreen";
import EditUser from "../screens/editScreens/EditUserScreen";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function StackNavigatorUsers() {
    const { user } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        if (!user.isSuperAdmin) {
            navigation.navigate("Devices");
        }
    }, [user, navigation]);

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
