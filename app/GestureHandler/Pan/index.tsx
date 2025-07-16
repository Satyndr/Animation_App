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
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = offsetX.value + event.translationX;
      translateY.value = offsetY.value + event.translationY;
      // translateX.value = withSpring(offsetX.value + event.translationX);
      // translateY.value = withSpring(offsetY.value + event.translationY);
    })
    .onEnd(() => {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
      // translateX.value = withSpring(0);
      // translateY.value = withSpring(0);
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={panGesture}>
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
