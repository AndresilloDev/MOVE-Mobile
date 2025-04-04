import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RecoverAccount from '../screens/RecoverAccount';
import ChangePasswordRecoverScreen from '../screens/ChangePasswordRecoverScreen';

const Stack = createNativeStackNavigator();

const StackNavigatorHome = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="ForgotPassword" component={RecoverAccount}/>
      <Stack.Screen name="CodeVerification" component={ChangePasswordRecoverScreen}/>
    </Stack.Navigator>
  );
}

export default StackNavigatorHome;