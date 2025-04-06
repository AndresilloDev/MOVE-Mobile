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
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
            <>
                <Stack.Screen name="User" component={BottomTabNavigator} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
            </>
            ) : (
          <Stack.Screen name="NoUser" component={StackNavigatorHome} />
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
