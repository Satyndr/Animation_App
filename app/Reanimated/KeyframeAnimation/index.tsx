import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import Animated, { Keyframe } from "react-native-reanimated";
import Header from "@/components/Header";

const Index = () => {
  const [showBox, setShowBox] = useState(false);

  const enteringAnimation = new Keyframe({
    0: {
      opacity: 0,
      transform: [{ translateY: 300 }, { rotate: "0deg" }],
    },
    100: {
      opacity: 1,
      transform: [{ translateY: 0 }, { rotate: "360deg" }],
    },
  });

  const exitingAnimation = new Keyframe({
    0: {
      opacity: 1,
      transform: [{ translateY: 0 }, { rotate: "0deg" }],
    },
    100: {
      opacity: 0,
      transform: [{ translateY: -300 }, { rotate: "-360deg" }],
    },
  });

  return (
    <View style={styles.container}>
      <Header backOnly />
      <Button
        title={showBox ? "Hide Box" : "Show Box"}
        onPress={() => setShowBox(!showBox)}
      />
      <View style={styles.boxContainer}>
        {showBox && (
          <Animated.View
            style={styles.box}
            entering={enteringAnimation}
            exiting={exitingAnimation}
          />
        )}
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  boxContainer: {
    marginTop: 20,
    height: 300,
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
