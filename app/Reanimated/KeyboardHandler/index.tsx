import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";

const index = () => {
  const [value, setValue] = useState("");

  const keyboard = useAnimatedKeyboard();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value }],
    };
  });
  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder="Enter Text"
        style={styles.textInput}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    justifyContent: "flex-end",
  },
  textInput: {
    backgroundColor: "white",
    padding: 10,
    margin: 20,
    borderRadius: 10,
  },
});

export default index;
