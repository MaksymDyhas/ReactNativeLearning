import React, { useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import Navigation from "../navigation";
import SplashScreen from "react-native-splash-screen";


function App() {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#2c2c2c" />
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({});

export default App;
