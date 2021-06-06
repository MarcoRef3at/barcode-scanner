import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Scanner from "../Components/Scanner";

const Stack = createStackNavigator();
const ScannerNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Scanner" component={Scanner} />
  </Stack.Navigator>
);

export default ScannerNavigator;
