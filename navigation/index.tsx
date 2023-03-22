import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "../src/stack/RootStack";

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
  );
};

export default Navigation;
