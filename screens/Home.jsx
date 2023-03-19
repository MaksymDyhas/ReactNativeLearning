import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Cars, TravelCar, VillageHouse } from "../assets/svgImages";
import MaskedView from "@react-native-masked-view/masked-view";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#284db4", "rgba(134,46,46,0.82)", "rgb(61,54,54)"]}
                      style={styles.linearGradient}>
        <View style={styles.forSvg}>
          <View style={styles.forTwoSvgInRow}>
            <Cars width={"45%"} height={150} fill={"#ded9d9"} />
            <VillageHouse width={"45%"} height={150} fill={"#1a1c1a"} />
          </View>
          <TravelCar width={"90%"} height={100} style={styles.car} />
        </View>
        <View style={styles.forText}>
          <View style={styles.forMask}>
            <MaskedView style={{ flex: 1, flexDirection: "row" }}
                        maskElement={
                          <View style={{ backgroundColor: "transparent" }}>
                            <Text style={styles.textBold}>I`m added navigation to my project. Enter button below</Text>
                          </View>
                        }>
              <LinearGradient
                style={{ flex: 1 }}
                useAngle={true}
                angle={220}
                colors={["rgb(0,97,248)", "rgba(92,164,194,0.58)", "#ffb500"]} />
            </MaskedView>
          </View>
          <View style={styles.otherFontsForMask}>
            <MaskedView style={{ flex: 1, justifyContent:'center', alignItems:'center' }} maskElement={
              <View style={{ backgroundColor: "transparent", paddingLeft: 55 }}>
                <Text style={styles.textSemiBold}>Click to enter profile</Text>
              </View>
            }>
              <TouchableHighlight onPress={() => navigation.navigate("Profile")}>
                <View style={{ padding: -60 }}>
                  <Image source={require("../assets/Gradient.webp")} style={{ width: 360, height: 65 }} />
                </View>
              </TouchableHighlight>
            </MaskedView>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  forTwoSvgInRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  forSvg: {
    flex: 1,
    justifyContent: "center",
  },
  car: {
    margin: 0,
    padding: 0,
    marginTop: 30,
    fill: "#1a1c1a",
    marginLeft: "5%",
  },
  forText: {
    flex: 1,
  },
  forMask: {
    flex: 1 / 3,
    backgroundColor: "#2c2c2c",
    borderRadius: 15,
    padding: 10,
  },
  textBold: {
    fontFamily: "EduNSWACTFoundation-Bold",
    fontSize: 30,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
  otherFontsForMask: {
    flex: 1 / 5,
    marginTop: 20,
    backgroundColor: "#131111",
    borderRadius: 15,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: 'white'
  },
  textRegular: {
    fontFamily: "EduNSWACTFoundation-Regular",
    fontSize: 32,
    color: "black",
    marginVertical: 4,
  },
  textMedium: {
    fontFamily: "EduNSWACTFoundation-Medium",
    fontSize: 32,
    color: "black",
    marginVertical: 4,
  },
  textSemiBold: {
    fontFamily: "EduNSWACTFoundation-SemiBold",
    fontSize: 32,
    color: "black",
    marginVertical: 4,
  },
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
});


export default Home;
