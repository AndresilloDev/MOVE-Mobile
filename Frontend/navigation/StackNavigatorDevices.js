import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectedDeviceScreen from '../screens/SelectedDeviceScreen';
import DevicesScreen from '../screens/DevicesScreen';
import AddDeviceScreen from '../screens/AddDeviceScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigatorDevices() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Devices" 
        component={DevicesScreen} 
        options={{headerShown : false}} />
      <Stack.Screen 
        name="SelectedDevice" 
        component={SelectedDeviceScreen} 
        options={{headerShown : false}} />
        <Stack.Screen
        name="AddDevice"
        component={AddDeviceScreen}
        options={{headerShown : false}} />
    </Stack.Navigator>
  );
}