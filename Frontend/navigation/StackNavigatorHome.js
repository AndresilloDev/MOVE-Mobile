import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RecoverAccount from '../screens/RecoverAccount';
import ChangePasswordRecoverScreen from '../screens/ChangePasswordRecoverScreen';

const Stack = createNativeStackNavigator();

const StackNavigatorHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="ForgotPassword"
          component={RecoverAccount}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="CodeVerification"
          component={ChangePasswordRecoverScreen}
          options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigatorHome;