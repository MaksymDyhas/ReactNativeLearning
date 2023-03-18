import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Cars, TravelCar, VillageHouse } from "./assets/svgImages";


function App() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#284eb4" />
      <View style={styles.background}>
        <View style={styles.forSvg}>
          <View style={styles.forTwoSvgInRow}>
            <Cars width={"45%"} height={150} fill={"#ded9d9"} />
            <VillageHouse width={"45%"} height={150} fill={"#1a1c1a"} />
          </View>
          <TravelCar width={"90%"} height={100} style={styles.car} />
        </View>
        <View style={styles.forText}>
          <Text style={styles.textBold}>I`m added custom fonts to my app. This is a Bold font</Text>
          <Text style={styles.textSemiBold}>This is a SemiBold font</Text>
          <Text style={styles.textMedium}>This is a Medium font</Text>
          <Text style={styles.textRegular}>This is a Regular font</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#284eb4",
    paddingHorizontal: 15,
  },
  forTwoSvgInRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  forSvg: {
    marginTop: 30,
  },
  car: {
    margin: 0,
    padding: 0,
    marginVertical: 30,
    fill: "#1a1c1a",
    marginLeft: "5%",
  },
  forText: {
    flex: 1,
  },
  textBold: {
    fontFamily: "EduNSWACTFoundation-Bold",
    fontSize: 30,
    color: "#f5f2f2",
    marginVertical: 4,
  },
  textRegular: {
    fontFamily: "EduNSWACTFoundation-Regular",
    fontSize: 28,
    color: "#ded4d4",
    marginVertical: 4,
  },
  textMedium: {
    fontFamily: "EduNSWACTFoundation-Medium",
    fontSize: 28,
    color: "#ded4d4",
    marginVertical: 4,
  },
  textSemiBold: {
    fontFamily: "EduNSWACTFoundation-SemiBold",
    fontSize: 28,
    color: "#ded4d4",
    marginVertical: 4,
  },
});

export default App;