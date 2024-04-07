import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginRegisterScreen from "../screens/LoginRegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import NoteScreen from "../screens/NoteScreen";
import ContactScreen from "../screens/ContactScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="RegisterScreen"
        initialRouteName="HomeScreen"
        screenOptions={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#ffffff" },
          headerTitleStyle: { fontWeight: "bold", color: "black" },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="RegisterScreen"
          component={LoginRegisterScreen}
          options={{ title: "Remembrall" }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Home" }}
        />

        <Stack.Screen
          name="NoteScreen"
          component={NoteScreen}
          options={{ title: "Notes" }}
        />
        <Stack.Screen
          name="ContactScreen"
          component={ContactScreen}
          options={{ title: "Contacts" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
