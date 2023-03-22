import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import Navigation from "../navigation";

function App() {

  return (
    <>
      <StatusBar backgroundColor="#2c2c2c" />
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({
});

export default App;
