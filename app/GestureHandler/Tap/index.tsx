import { StyleSheet, View } from "react-native";
import React from "react";
import Header from "@/components/Header";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const index = () => {
  const scale = useSharedValue(1);

  const tapGesture = Gesture.Tap().onEnd(() => {
    scale.value = withSpring(scale.value === 1 ? 2 : 1);
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={tapGesture}>
        <View style={styles.container}>
          <Header backOnly />

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Animated.View style={[styles.circle, animatedStyles]} />
          </View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default index;

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    backgroundColor: "yellow",
    borderRadius: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#222",
    flexDirection: "column",
    gap: 5,
  },
});
