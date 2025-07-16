import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  useAnimatedValue,
} from "react-native";
import React from "react";
import Header from "@/components/Header";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const CustomComponent = () => {
  const scaleValue = useAnimatedValue(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 2,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Header startAnimation={() => {}} />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AnimatedTouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[styles.circle, { transform: [{ scale: scaleValue }] }]}
        >
          <Text>This is Animated</Text>
        </AnimatedTouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    backgroundColor: "yellow",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#222",
    flexDirection: "column",
    gap: 5,
  },
});

export default CustomComponent;
