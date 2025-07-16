import { View, StyleSheet, Animated, useAnimatedValue } from "react-native";
import React, { useRef } from "react";
import Header from "@/components/Header";

const Basic = () => {
  const xyValue = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const oscillation = useAnimatedValue(0);

  const startAnimation1 = () => {
    Animated.timing(xyValue, {
      toValue: { x: 200, y: 200 },
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(xyValue, {
        toValue: { x: 0, y: 0 },
        duration: 1500,
        useNativeDriver: true,
      }).start();
    });
  };

  const circleOscillationLoop = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(oscillation, {
          toValue: 200,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(oscillation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 5 }
    ).start();
  };

  const handleStartAnimation = () => {
    startAnimation1();
    circleOscillationLoop();
  };

  return (
    <View style={styles.container}>
      <Header startAnimation={handleStartAnimation} />

      <Animated.View
        style={[styles.box, { transform: xyValue.getTranslateTransform() }]}
      ></Animated.View>

      <Animated.View
        style={[styles.circle, { transform: [{ translateX: oscillation }] }]}
      ></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: "yellow",
  },
  circle: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    borderRadius: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#222",
    flexDirection: "column",
    gap: 5,
  },
});

export default Basic;
