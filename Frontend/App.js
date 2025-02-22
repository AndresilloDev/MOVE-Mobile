import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import ConfirmarCuentaScreen from './Screens/ChangePasswordRecoverScreen'; // Asegúrate de que la ruta sea correcta

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="ConfirmarCuenta"
                    component={ConfirmarCuentaScreen}
                    options={{ headerShown: false }} 
                />
            </Stack.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}