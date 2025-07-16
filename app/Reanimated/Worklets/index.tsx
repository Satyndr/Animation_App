import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Header from "@/components/Header";

const index = () => {
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const anim = () => {
    "worklet";
    translateY.value = withSpring(translateY.value === 0 ? 150 : 0);
  };
  return (
    <View style={styles.container}>
      <Header backOnly />
      <Pressable onPress={anim} style={{ borderColor: "#fff", borderWidth: 1 }}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </Pressable>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "yellow",
    borderRadius: 10,
  },
});
