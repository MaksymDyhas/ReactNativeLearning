import MaskedView from "@react-native-masked-view/masked-view";
import React from "react";
import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  style?: object;
}

const MyButton = ({ title, onPress, style }: Props) => {
  return (
    <View style={{ ...styles.backMask, ...style }}>
      <MaskedView style={styles.maskedView} maskElement={
        <View style={{ backgroundColor: "transparent", alignItems: 'center' }}>
          <Text style={styles.textSemiBold}>{title}</Text>
        </View>
      }>
        <TouchableHighlight onPress={onPress}>
          <View style={{ padding: -60 }}>
            <Image source={require("../../assets/Gradient.webp")} style={{ width: 360, height: 65 }} />
          </View>
        </TouchableHighlight>
      </MaskedView>
    </View>
  );
};

const styles = StyleSheet.create({
  textSemiBold: {
    fontFamily: "EduNSWACTFoundation-Regular",
    fontSize: 36,
    color: "black",
    marginVertical: 4
  },
  maskedView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backMask: {
    height: 70,
    backgroundColor: "#131111",
    borderRadius: 15,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: "white"
  }
});

export default MyButton;


