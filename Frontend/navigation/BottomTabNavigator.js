import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigatorBuildings from './StackNavigatorBuildings';
import AdminsScreen from '../screens/AdminsScreen';
import StackNavigatorNotifications from './StackNavigatorNotifications';
import StackNavigatorDevices from './StackNavigatorDevices';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Devices" component={StackNavigatorDevices} />
      <Tab.Screen name="Buildings" component={StackNavigatorBuildings} />
      <Tab.Screen name="Admins" component={AdminsScreen} />
      <Tab.Screen name="Notifications" component={StackNavigatorNotifications} />
    </Tab.Navigator>
  );
}