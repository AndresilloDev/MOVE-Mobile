import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import ConfirmarCuentaScreen from './Screens/ChangePasswordRecoverScreen';
import NotificationsPage from './Screens/NotificationsPage';
import ClassroomsPage from './Screens/ClassroomsPage';
import UserPage from './Screens/UsersScreen';
import "./global.css";

const Stack = createNativeStackNavigator();

const screenOptions = {
    headerTitle: () => null,
    headerLeft: () => (
        <Image
            source={require("./assets/logo.png")}
            style={{ width: 80, height: 80, marginLeft: 10 }}
            resizeMode="contain"
        />
    ),
};

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Classrooms"
                    component={ClassroomsPage}
                    options={screenOptions}
                />
                <Stack.Screen
                    name="Users Page"
                    component={UserPage}
                    options={screenOptions}
                />
                <Stack.Screen
                    name="ConfirmarCuenta"
                    component={ConfirmarCuentaScreen}
                    options={screenOptions}
                />
                <Stack.Screen
                    name="Notifications"
                    component={NotificationsPage}
                    options={screenOptions}
                />
            </Stack.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}
