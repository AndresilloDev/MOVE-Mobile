import React from 'react';
import "./global.css";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AuthProvider} from './context/AuthContext';
import MainNavigator from './navigation/AppNavigator';
import {NotificationProvider} from './context/NotificationContext';

export default function App() {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NotificationProvider>
          <AuthProvider>
            <MainNavigator />
          </AuthProvider>
        </NotificationProvider>
      </GestureHandlerRootView>
    );
  }
