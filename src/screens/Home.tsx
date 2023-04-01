import React, { useCallback, useRef } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { TravelCar } from "../../assets/svgImages";
import { HomeProps } from "../stack/RootStack";
import MyButton from "../../src/components/MyButton";
import BottomSheet from "@gorhom/bottom-sheet";
import MyBottomSheet from "../components/MyBottomSheet";


const Home = ({ navigation }: HomeProps) => {

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handlePresentModal = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#284db4", "rgba(134,46,46,0.82)", "rgb(61,54,54)"]}
                      style={styles.linearGradient}>
        <TouchableOpacity activeOpacity={1} onPressIn={() => bottomSheetRef.current?.close()}>
          <View style={styles.forSvg}>
            <MyButton style={{ marginTop: 15, backgroundColor: "rgb(0,0,0)", borderColor: "#fcfcfc" }}
                      title={"Todo List (Async Storage)"} onPress={() => {
              bottomSheetRef.current?.close();
              navigation.navigate("TodoList");
            }} />
            <MyButton style={{ marginTop: 15, backgroundColor: "rgb(0,0,0)", borderColor: "#fcfcfc" }}
                      title={"GEOLOCATION"} onPress={() => {
              bottomSheetRef.current?.close();
              navigation.navigate("Geolocation");
            }} />
            <MyButton style={{ marginTop: 15, backgroundColor: "rgb(0,0,0)", borderColor: "#fcfcfc" }}
                      title={"Animations"}
                      onPress={() => {
                        bottomSheetRef.current?.close();
                        navigation.navigate("Animations");
                      }} />
            <TravelCar width={"90%"} height={100} style={styles.car} />
          </View>
          <MyButton style={{ marginVertical: 15 }} title={"Mobx Training"}
                    onPress={() => {
                      bottomSheetRef.current?.close();
                      navigation.navigate("MobxTraining");
                    }} />
          <MyButton title={"Camera"} style={{ backgroundColor: "#090752" }}
                    onPress={() => {
                      bottomSheetRef.current?.close();
                      navigation.navigate("ReduxTraining");
                    }} />
          <MyButton title={"DeviceINFO / Netinfo"} style={{ backgroundColor: "#090752", marginTop: 15 }}
                    onPress={handlePresentModal} />
        </TouchableOpacity>
          <MyBottomSheet ref={bottomSheetRef}/>
      </LinearGradient>
    </SafeAreaView>
  )
    ;
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
  },
});


export default Home;
