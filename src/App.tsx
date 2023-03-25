import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import Navigation from "../navigation";
import SplashScreen from "react-native-splash-screen";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#2c2c2c" />
      <Navigation />
      <FlashMessage position="top" />
    </Provider>
  );
}


export default App;
