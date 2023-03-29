import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import Navigation from "../navigation";
import SplashScreen from "react-native-splash-screen";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import store from "./redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function App() {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#2c2c2c" />
        <Navigation />
        <FlashMessage position="top" />
      </GestureHandlerRootView>
    </Provider>
  );
}


export default App;
