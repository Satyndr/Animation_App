import {
  View,
  StyleSheet,
  Animated,
  useAnimatedValue,
  Easing,
} from "react-native";
import React, { useRef } from "react";
import Header from "@/components/Header";

const Interpolate = () => {
  const decayValue = useAnimatedValue(0);
  const springValue = useAnimatedValue(0);
  const timingValue = useAnimatedValue(0);

  const decayAnimation = () => {
    Animated.decay(decayValue, {
      velocity: 2,
      deceleration: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const springAnimation = () => {
    Animated.spring(springValue, {
      toValue: 1,
      tension: 100,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const timingAnimation = () => {
    Animated.timing(timingValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const decayX = decayValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 200],
  });

  const springX = springValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const timingX = timingValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const handleStartAnimation = () => {
    decayAnimation();
    springAnimation();
    timingAnimation();
  };

  return (
    <View style={styles.container}>
      <Header startAnimation={handleStartAnimation} />

      <Animated.View
        style={[styles.box1, { transform: [{ translateX: decayX }] }]}
      />
      <Animated.View
        style={[styles.box2, { transform: [{ translateX: springX }] }]}
      />
      <Animated.View
        style={[styles.box3, { transform: [{ translateX: timingX }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box1: {
    width: 100,
    height: 100,
    backgroundColor: "yellow",
    borderRadius: 50,
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 50,
  },
  box3: {
    width: 100,
    height: 100,
    backgroundColor: "green",
    borderRadius: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#222",
    flexDirection: "column",
    gap: 5,
  },
});

export default Interpolate;
