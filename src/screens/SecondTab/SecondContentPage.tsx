import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SecondContentPageProps } from "../../stack/RootStack";
import MyButton from "../../components/MyButton";


const SecondContentPage = ({ navigation }: SecondContentPageProps) => {


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#0e3bc9", "rgba(108,104,104,0.82)", "rgb(29,63,180)"]}
                      style={styles.linearGradient}>

        <MyButton style={{ marginTop: 12, backgroundColor: "rgb(0,0,0)", borderColor: "#fcfcfc" }}
                  title={"Section List"} onPress={() => {
          navigation.navigate("SectionList");
        }} />

      </LinearGradient>
    </SafeAreaView>
  )
    ;
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 20
  }

});


export default SecondContentPage;
