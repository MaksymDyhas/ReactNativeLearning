import React, { useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import Navigation from "../navigation";
import SplashScreen from "react-native-splash-screen";
import FlashMessage from "react-native-flash-message";

function App() {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#2c2c2c" />
      <Navigation />
      <FlashMessage position="top" />
    </>
  );
}

const styles = StyleSheet.create({});

export default App;
