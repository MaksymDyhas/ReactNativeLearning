import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Counter from "../components/Counter";

const ReduxTraining = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#284db4", "rgba(134,46,46,0.82)", "rgb(61,54,54)"]}
                      style={styles.linearGradient}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: 'white', fontSize: 26 }}>Counter: </Text>
          <Counter propsStyle={{ marginVertical: 20, alignItems: "center" }} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15
  }
});

export default ReduxTraining;
