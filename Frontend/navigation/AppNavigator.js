import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import BottomTabNavigator from "./BottomTabNavigator";
import StackNavigatorHome from "./StackNavigatorHome";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <Stack.Screen name="User" component={BottomTabNavigator} />
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
