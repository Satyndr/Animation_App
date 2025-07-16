import { View, Text, StyleSheet, Button } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withClamp,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import React from "react";
import Header from "@/components/Header";

const index = () => {
  const translateX = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  return (
    <View style={styles.container}>
      <Header backOnly />
      <Animated.View style={[styles.circle, animatedStyles]} />
      <View style={styles.buttons}>
        <Button
          title="withTiming"
          onPress={() => {
            translateX.value = withTiming(200, { duration: 1000 });
          }}
        />
        <Button
          title="withSpring"
          onPress={() => {
            translateX.value = withSpring(200, { damping: 10, stiffness: 100 });
          }}
        />
        <Button
          title="withSequence"
          onPress={() => {
            translateX.value = withSequence(
              withTiming(200, { duration: 500 }),
              withTiming(0, { duration: 500 })
            );
          }}
        />
        <Button
          title="withRepeat"
          onPress={() => {
            translateX.value = withRepeat(
              withTiming(200, { duration: 500 }),
              4,
              true //reverse
            );
          }}
        />
        <Button
          title="withDelay"
          onPress={() => {
            translateX.value = withDelay(
              1000,
              withTiming(200, { duration: 500 })
            );
          }}
        />
        <Button
          title="withClamp"
          onPress={() => {
            translateX.value = withClamp(
              {
                min: -100,
                max: 200,
              },
              withTiming(500, { duration: 500 })
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    backgroundColor: "yellow",
  },
  container: {
    flex: 1,
    backgroundColor: "#222",
    flexDirection: "column",
    gap: 5,
    paddingTop: 20,
  },
  buttons: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});

export default index;
