import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthContext} from "../context/AuthContext";
import BottomTabNavigator from "./BottomTabNavigator";
import StackNavigatorHome from "./StackNavigatorHome";
import ProfileScreen from "../screens/ProfileScreen";
import {useContext} from "react";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
            <>
                <Stack.Screen
                    name="User"
                    component={BottomTabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
            </>
            ) : (
          <Stack.Screen
              name="NoUser"
              component={StackNavigatorHome}
              options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <MainNavigator />
  );
}
