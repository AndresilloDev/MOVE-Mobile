import React, { useState } from 'react';
import "./global.css";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './context/AuthContext';
import MainNavigator from './navigation/AppNavigator';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <MainNavigator />
        </AuthProvider>
      </GestureHandlerRootView>
    );
  }
