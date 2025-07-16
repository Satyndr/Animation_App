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
  const degree = useSharedValue(0);
  const cumulativeRotation = useSharedValue(0); //for retaining the rotation value

  const rotateGesture = Gesture.Rotation()
    .onUpdate((event) => {
      //   degree.value = cumulativeRotation.value + event.rotation;
      degree.value = event.rotation;
    })
    .onEnd(() => {
      //   cumulativeRotation.value = degree.value;
      degree.value = withSpring(0);
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${degree.value}rad` }],
    };
  });
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={rotateGesture}>
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
    width: 200,
    height: 200,
    backgroundColor: "yellow",
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#222",
    flexDirection: "column",
    gap: 5,
  },
});
