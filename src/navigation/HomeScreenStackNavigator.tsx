import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InputScreen from "../screens/InputScreen";

const Stack = createNativeStackNavigator();
export function HomeScreenStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="InputScreen" component={InputScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
