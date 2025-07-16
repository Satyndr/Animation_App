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
  const degree = useSharedValue(0);
  const scale = useSharedValue(1);

  const tapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      scale.value = withSpring(scale.value === 1 ? 2 : 1);
    });

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = event.scale;
    })
    .onEnd(() => {
      scale.value = withSpring(1);
    });

  const rotateGesture = Gesture.Rotation()
    .onUpdate((event) => {
      //   degree.value = cumulativeRotation.value + event.rotation;
      degree.value = event.rotation;
    })
    .onEnd(() => {
      //   cumulativeRotation.value = degree.value;
      degree.value = withSpring(0);
    });

  const raceGesture = Gesture.Race(
    tapGesture,
    panGesture,
    pinchGesture,
    rotateGesture
  );

  const simultaneousGesture = Gesture.Simultaneous(
    tapGesture,
    panGesture,
    pinchGesture,
    rotateGesture
  );

  const exclusiveGesture = Gesture.Exclusive(
    panGesture,
    pinchGesture,
    rotateGesture
  );

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${degree.value}rad` },
      ],
    };
  });
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={simultaneousGesture}>
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
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#222",
    flexDirection: "column",
    gap: 5,
  },
});
