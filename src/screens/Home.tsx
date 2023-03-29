import React, { useCallback, useMemo, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { TravelCar } from "../../assets/svgImages";
import { HomeProps } from "../stack/RootStack";
import MyButton from "../../src/components/MyButton";
import BottomSheet from "@gorhom/bottom-sheet";


const Home = ({ navigation }: HomeProps) => {
  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "50%", "100%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetIndex(index);
  }, []);

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
                      title={"Sign in (Encrypted)"}
                      onPress={() => {
                        bottomSheetRef.current?.close();
                        navigation.navigate("Login");
                      }} />
            <TravelCar width={"90%"} height={100} style={styles.car} />
          </View>
          <MyButton style={{ marginVertical: 15 }} title={"Click to enter profile"}
                    onPress={() => {
                      bottomSheetRef.current?.close();
                      navigation.navigate("Profile");
                    }} />
          <MyButton title={"Camera"} style={{ backgroundColor: "#090752" }}
                    onPress={() => {
                      bottomSheetRef.current?.close();
                      navigation.navigate("ReduxTraining");
                    }} />
          <MyButton title={"Open bottom sheet"} style={{ backgroundColor: "#090752", marginTop: 15 }}
                    onPress={handlePresentModal} />
        </TouchableOpacity>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          backgroundStyle={bottomSheetIndex === 2 ? { borderRadius:0 } : { borderRadius: 30 }}
          enablePanDownToClose={true}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <View style={styles.row}>
              <Text style={{ fontSize: 16 }}>Dark Mode (Future)</Text>
              <Switch value={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </View>
            <Text style={{ fontSize: 16 }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati,
              provident?</Text>
            <View style={{
              width: "100%",
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: "grey",
              marginVertical: 30
            }} />
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>50%</Text>
            </View>
            <View style={{
              width: "100%",
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: "black",
              marginVertical: 10
            }} />
            <View style={{ flex: 2, justifyContent: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>100%</Text>
            </View>
          </View>
        </BottomSheet>
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  }
});


export default Home;
