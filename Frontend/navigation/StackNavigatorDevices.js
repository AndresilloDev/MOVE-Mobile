import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SelectedDeviceScreen from "../screens/SelectedDeviceScreen";
import AddDeviceScreen from "../screens/addScreens/AddDeviceScreen";
import DevicesScreen from "../screens/DevicesScreen";
import ConnectDeviceScreen from "../screens/ConnectDeviceScreen";
import EditDeviceScreen from "../screens/editScreens/EditDeviceScreen";
import DeleteDeviceScreen from "../screens/deleteScreens/DeleteDeviceScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigatorDevices() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Devices"
                component={DevicesScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SelectedDevice"
                component={SelectedDeviceScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditDevice"
                component={EditDeviceScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DeleteDevice"
                component={DeleteDeviceScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ConnectDevice"
                component={ConnectDeviceScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddDevice"
                component={AddDeviceScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
