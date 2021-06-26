import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Profile from "../Profile";
import Settings from "../Settings";

const Stack = createStackNavigator();

export const SettingScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Settings" headerMode={"none"}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
