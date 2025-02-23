import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RecoverAccount from '../screens/RecoverAccount';
import ChangePasswordRecoverScreen from '../screens/ChangePasswordRecoverScreen';

const Stack = createNativeStackNavigator();

const StackNavigatorHome = () => {
  return (
    <Stack.Navigator
        screenOptions={ () => ({
            header: () => (
                <SafeAreaView className="bg-white">
                    <View className="h-12 bg-white flex justify-between items-center shadow-md flex-row">
                        <Image
                            source={require("../assets/logo.png")}
                            className="w-32 h-10"
                        />
                    </View>
                </SafeAreaView>
            ),
            headerShown: false,
        })}>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="ForgotPassword" component={RecoverAccount}/>
      <Stack.Screen name="CodeVerification" component={ChangePasswordRecoverScreen}/>
    </Stack.Navigator>
  );
}

export default StackNavigatorHome;