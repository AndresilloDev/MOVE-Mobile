import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotificationsScreen from '../screens/NotificationsScreen';
import ArchivedNotifications from '../screens/ArchivedNotifications';
import SelectedNotification from '../screens/SelectedNotificationScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigatorNotifications() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notifications" component={NotificationsScreen} 
        options={{headerShown : false}} />
      <Stack.Screen name="ArchivedNotifications" component={ArchivedNotifications} 
        options={{headerShown : false}} />
      <Stack.Screen name="SelectedNotification" component={SelectedNotification} options={{headerShown : false}} />
    </Stack.Navigator>
  );
}