import React, { useEffect, useRef } from "react";
import { BackHandler, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";


const WebViews = ({}) => {
  const webViewRef = useRef<WebView>(null);

  const rotateOn = useSharedValue(0);

  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  const rnStyleRotate = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotateOn.value}deg` }]
    };
  }, []);

  const handleRefresh = () => {
    rotateOn.value = withRepeat(withTiming(360, { duration: 450 }), -1);
  };


  useEffect(() => {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onAndroidBackPress);
      };
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{
          uri: "https://google.com"
        }}
        onError={(event) => {
          console.log(event);
        }}
        onLoadEnd={() => {
          rotateOn.value = 0
        }}
      />
      <View style={{
        justifyContent: "space-around",
        paddingHorizontal: 100,
        backgroundColor: "#d2e4ef",
        flexDirection: "row"
      }}>
        <TouchableOpacity style={styles.buttonNav} onPress={() => webViewRef.current?.goBack()}><Text
          style={styles.textNav}>{"<"}</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.buttonNav, { borderWidth: 0 }]}
                          onPress={() => {
                            handleRefresh();
                            webViewRef.current?.reload();
                          }}>
          <Animated.Image source={require("../../assets/refresh.png")} style={[styles.img, rnStyleRotate]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNav}
                          onPress={() => webViewRef.current?.goForward()}>
          <Text style={styles.textNav}>{">"}</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonNav: {
    alignSelf: "center",
    borderRadius: 50,
    marginVertical: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  textNav: {
    fontSize: 22,
    color: "black",
  },
  img: {
    width: 25,
    height: 25
  }
});

export default WebViews;
