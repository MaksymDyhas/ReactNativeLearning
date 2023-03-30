import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";

type ContextGesture = {
  translateX: number;
  translateY: number;
}

const Animations = () => {
  const [theme, setTheme] = useState<string>("light");
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const opacity = useSharedValue(0);
  const scale = useSharedValue(2);
  const translateX1 = useSharedValue(115);
  const translateY1 = useSharedValue(215);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const SWITCH_TRACK_COLOR = {
    true: "rgb(23,22,22)",
    false: "rgb(255,255,255)"
  };

  const Colors = {
    dark: {
      background: "#1E1E1E",
      text: "#F8F8F8"
    },
    light: {
      background: "#F8F8F8",
      text: "#1E1E1E"
    }
  };

  const progress = useDerivedValue(() => {
    return theme === "dark" ? withTiming(1) : withTiming(0);
  }, [theme]);

  const reanimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, [1, 0], [
      Colors.dark.background, Colors.light.background
    ]);
    return {
      backgroundColor,
      opacity: opacity.value,
      borderRadius: 50 / scale.value,
      transform: [{ translateX: translateX1.value - 120 }, { translateY: translateY1.value - 210 }]
    };
  }, []);

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextGesture>({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      if (translateY.value < -120) {
        translateY.value = withSpring(-120);
      }
      if (translateY.value > 510) {
        translateY.value = withSpring(510);
      }
      if (translateX.value < -72) {
        translateX.value = withSpring(-72);
      }
      if (translateX.value > 250) {
        translateX.value = withSpring(250);
      }
    }
  });


  const rBackStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, [0, 1], [
      Colors.dark.background, Colors.light.background
    ]);
    return { backgroundColor };
  }, []);


  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(progress.value, [0, 1], [
      Colors.dark.text, Colors.light.text
    ]);
    return { color };
  }, []);

  const rTextStyleInvert = useAnimatedStyle(() => {
    const color = interpolateColor(progress.value, [1, 0], [
      Colors.dark.text, Colors.light.text
    ]);
    return { color };
  }, []);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, [0, 1], [
      Colors.light.background, Colors.dark.background
    ]);
    return {
      backgroundColor,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value }
      ]
    };
  }, []);

  const translateSquare = () => {
    translateX1.value =
      withSequence(
        withTiming(windowWidth, { duration: 900 }),
        withDelay(900, withTiming(115, { duration: 900 }))
      );
    translateY1.value =
      withSequence(
        withDelay(900, withTiming(windowHeight, { duration: 900 })),
        withDelay(900, withTiming(215, { duration: 900 }))
      );
  };

  useEffect(() => {
    scale.value = withRepeat(withTiming(1, { duration: 450 }), -1, true);
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View style={[styles.background, rBackStyle]}>
        <View style={styles.topOfPage}>

          <AnimatedTouchable activeOpacity={1} onPress={translateSquare}
                             style={[{
                               height: 100,
                               width: 100,
                               alignItems: "center",
                               justifyContent: "center"
                             }, reanimatedStyle]}>
            <Animated.Text style={[{ fontSize: 18 }, rTextStyleInvert]}>Press me!</Animated.Text>
          </AnimatedTouchable>

          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={[styles.forMove, rStyle]}>
              <Animated.Text style={[{ color: "white", fontSize: 16 }, rTextStyleInvert]}>Move where you
                want</Animated.Text>
            </Animated.View>
          </PanGestureHandler>

          <View style={{ alignItems: "center", justifyContent: "center", flex: 1 / 2 }}>
            <Animated.Text style={[{ fontSize: 26 }, rTextStyle]}>Change Theme</Animated.Text>
            <Switch style={{ margin: 10 }}
                    value={theme === "dark"} onValueChange={(toggled) => {
              setTheme(toggled ? "dark" : "light");
            }}
                    trackColor={SWITCH_TRACK_COLOR}
                    thumbColor={"violet"}
            />
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 15
  },
  topOfPage: {
    flex: 1,
    width: "100%"
  },
  forMove: {
    height: 100,
    width: 160,
    marginTop: 40,
    backgroundColor: "rgba(255,255,255,0.41)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  }

});

export default Animations;
