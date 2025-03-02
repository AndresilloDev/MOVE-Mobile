import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BuildingsScreen from '../screens/BuildingsScreen';
import ClassroomsScreen from '../screens/ClassroomsScreen';
import AddClassroom from '../screens/AddClassroom'; 
import EditClassroom from '../screens/EditClassroom'; 

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
        name="Classrooms"
        component={ClassroomsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddClassroom"
        component={AddClassroom}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditClassroom" 
        component={EditClassroom} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}