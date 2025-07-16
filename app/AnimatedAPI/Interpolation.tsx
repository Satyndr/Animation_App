import {
  View,
  StyleSheet,
  Animated,
  useAnimatedValue,
  Easing,
} from "react-native";
import React from "react";
import Header from "@/components/Header";

const Interpolate = () => {
  const position = useAnimatedValue(0);
  const startAnimation = () => {
    Animated.timing(position, {
      toValue: 2,
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handleStartAnimation = () => {
    startAnimation();
  };

  return (
    <View style={styles.container}>
      <Header startAnimation={handleStartAnimation} />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [
                {
                  translateX: position.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 100],
                    extrapolate: "identity",
                  }),
                },
              ],
            },
          ]}
        ></Animated.View>
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

export default Interpolate;
