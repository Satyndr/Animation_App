import { View, StyleSheet, Animated, PanResponder, Button } from "react-native";
import React, { useRef, useState } from "react";
import Header from "@/components/Header";

const PanResponderGesture = () => {
  const [diffClampEnabled, setDiffClampEnabled] = useState(false);

  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const diffClampX = useRef(Animated.diffClamp(pan.x, -100, 100)).current;
  const diffClampY = useRef(Animated.diffClamp(pan.y, -100, 100)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
      }).start();
    },
  });

  const handleStartAnimation = () => {};

  return (
    <View style={styles.container}>
      <Header startAnimation={handleStartAnimation} backOnly />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.circle,
            {
              transform: [
                { translateX: diffClampEnabled ? diffClampX : pan.x },
                { translateY: diffClampEnabled ? diffClampY : pan.y },
              ],
            },
          ]}
        ></Animated.View>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Button
            title={diffClampEnabled ? "Disable DiffClamp" : "Enable DiffClamp"}
            onPress={() => setDiffClampEnabled(!diffClampEnabled)}
          />
        </View>
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
  },
  container: {
    flex: 1,
    backgroundColor: "#222",
    flexDirection: "column",

    gap: 5,
  },
});

export default PanResponderGesture;
