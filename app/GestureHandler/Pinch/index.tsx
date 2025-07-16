import { StyleSheet, View } from "react-native";
import React from "react";
import Header from "@/components/Header";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const index = () => {
  const scale = useSharedValue(1);
  const cumulativeScale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = cumulativeScale.value * event.scale;
    })
    .onEnd(() => {
      cumulativeScale.value = scale.value;
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pinchGesture}>
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
