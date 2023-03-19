import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./screens/Profile";

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#2c2c2c" />
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerStyle: {
          backgroundColor: "#2c2c2c",
        },
        headerTintColor: "#f6f5f5",
        headerTitleStyle: {
          fontSize: 26,
          fontFamily: "EduNSWACTFoundation-Regular",
        },
      }}>
        <Stack.Screen name="Home page" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

export default App;
