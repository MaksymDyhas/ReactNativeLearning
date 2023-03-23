import React from "react";
import { Linking, SafeAreaView, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { TravelCar } from "../../assets/svgImages";
import { HomeProps } from "../stack/RootStack";
import Config from "react-native-config";
import MyButton from "../../src/components/MyButton";


const Home = ({ navigation }: HomeProps) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#284db4", "rgba(134,46,46,0.82)", "rgb(61,54,54)"]}
                      style={styles.linearGradient}>
        <View style={styles.forSvg}>
          <MyButton title={"Flash Messages"} onPress={() => navigation.navigate("TestFlashMessages")} />
          <MyButton style={{ marginTop: 15, backgroundColor: "rgb(0,0,0)", borderColor: "#fcfcfc"}} title={"Todo List (Async Storage)"} onPress={() => navigation.navigate("TodoList")} />
          <MyButton style={{ marginTop: 15, backgroundColor: "rgb(0,0,0)", borderColor: "#fcfcfc" }} title={"Sign in (Encrypted)"}
                    onPress={() => navigation.navigate("Login")} />
          <TravelCar width={"90%"} height={100} style={styles.car} />
        </View>
        <MyButton style={{ marginVertical: 15 }} title={"Click to enter profile"}
                  onPress={() => navigation.navigate("Profile")} />
        <MyButton title={"Open google from .env"} onPress={() => Linking.openURL(Config.GOOGLE as string)} />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  forTwoSvgInRow: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  forSvg: {
    justifyContent: "center"
  },
  car: {
    marginVertical: 50,
    padding: 0,
    fill: "#1a1c1a",
    marginLeft: "5%"
  },
  forMask: {
    height: 100,
    backgroundColor: "#2c2c2c",
    borderRadius: 15,
    padding: 10
  },
  textBold: {
    fontFamily: "EduNSWACTFoundation-Bold",
    fontSize: 30,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center"
  },

  textRegular: {
    fontFamily: "EduNSWACTFoundation-Regular",
    fontSize: 32,
    color: "black",
    marginVertical: 4
  },
  textMedium: {
    fontFamily: "EduNSWACTFoundation-Medium",
    fontSize: 32,
    color: "black",
    marginVertical: 4
  },
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15
  }
});


export default Home;
