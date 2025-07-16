import {
  View,
  StyleSheet,
  Animated,
  useAnimatedValue,
  Easing,
  Button,
} from "react-native";
import React, { useRef } from "react";
import Header from "@/components/Header";

const NestedAnimations = () => {
  const animValue1 = useAnimatedValue(0);
  const animValue2 = useAnimatedValue(0);

  const sequenceAnimation = () => {
    Animated.sequence([
      Animated.timing(animValue1, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animValue2, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const parallelAnimation = () => {
    Animated.parallel([
      Animated.timing(animValue1, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animValue2, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const staggerAnimation = () => {
    Animated.stagger(500, [
      Animated.timing(animValue1, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animValue2, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const loopAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animValue1, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animValue2, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleStartAnimation = () => {
    // sequenceAnimation();
  };

  return (
    <View style={styles.container}>
      <Header startAnimation={handleStartAnimation} />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View style={[styles.box1, { opacity: animValue1 }]} />
        <Animated.View style={[styles.box2, { opacity: animValue2 }]} />
      </View>
      <Button title="Sequence" onPress={sequenceAnimation} />
      <Button title="Parallel" onPress={parallelAnimation} />
      <Button title="Stagger" onPress={staggerAnimation} />
      <Button title="Loop" onPress={loopAnimation} />
    </View>
  );
};

const styles = StyleSheet.create({
  box1: {
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
  },
  container: {
    flex: 1,
    backgroundColor: "#222",
    flexDirection: "column",
    gap: 5,
  },
});

export default NestedAnimations;
