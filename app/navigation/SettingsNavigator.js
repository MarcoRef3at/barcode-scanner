import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "./../Components/Settings";

const Stack = createStackNavigator();
const SettingsNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Settings" component={Settings} />
  </Stack.Navigator>
);

export default SettingsNavigator;
