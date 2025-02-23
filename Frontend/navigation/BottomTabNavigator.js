import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigatorBuildings from './StackNavigatorBuildings';
import AdminsScreen from '../screens/AdminsScreen';
import StackNavigatorNotifications from './StackNavigatorNotifications';
import StackNavigatorDevices from './StackNavigatorDevices';
import { Image, SafeAreaView, View } from 'react-native';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={{
        header: () => 
          <SafeAreaView className="bg-white">
            <View className="h-24 pt-10 bg-white flex justify-center items-center shadow-md">
              <Image source={require("../assets/logo.png")} className="w-32 h-10" />
            </View>
          </SafeAreaView>,
        tabBarStyle: { height: 60 },
        tabBarLabelStyle: { fontSize: 12 },
      }}>
      <Tab.Screen name="Devices" component={StackNavigatorDevices} />
      <Tab.Screen name="Buildings" component={StackNavigatorBuildings} />
      <Tab.Screen name="Admins" component={AdminsScreen} />
      <Tab.Screen name="Notifications" component={StackNavigatorNotifications} />
    </Tab.Navigator>
  );
}