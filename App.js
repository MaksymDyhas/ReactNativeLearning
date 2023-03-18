import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";


function App() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#284eb4" />
      <View style={styles.background}>
        <Text style={styles.textBold}>I`m added custom fonts to my app. This is a Bold font</Text>
        <Text style={styles.textSemiBold}>This is a SemiBold font</Text>
        <Text style={styles.textMedium}>This is a Medium font</Text>
        <Text style={styles.textRegular}>This is a Regular font</Text>
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
