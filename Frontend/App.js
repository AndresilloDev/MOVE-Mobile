import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import "./global.css";
import HomeScreen from './screens/HomeScreen';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
      <NavigationContainer>
        {!isAuthenticated ? <HomeScreen setIsAuthenticated={setIsAuthenticated} /> :
        <BottomTabNavigator setIsAuthenticated={setIsAuthenticated} />}
      </NavigationContainer>
    );
  }
