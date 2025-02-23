import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import BottomTabNavigator from "./BottomTabNavigator";
import StackNavigatorHome from "./StackNavigatorHome";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
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
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}