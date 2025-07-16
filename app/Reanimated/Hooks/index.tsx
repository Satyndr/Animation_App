import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useAnimatedRef,
  measure,
} from "react-native-reanimated";
import React, { useEffect } from "react";
import Header from "@/components/Header";

const index = () => {
  const animatedRef = useAnimatedRef<View>(); //for accessing the values of referred view
  const progress = useSharedValue(0);

  const borderRadius = useDerivedValue(() => {
    return 10 + progress?.value * 200;
  });

  const animatedProps = useAnimatedProps(() => {
    return { style: { borderRadius: borderRadius.value } };
  });

  const startAnimation = () => {
    progress.value = withRepeat(
      withTiming(1, { duration: 500, easing: Easing.linear }),
      Infinity,
      true
    );
  };

  useEffect(() => {
    setTimeout(() => {
      const layout = measure(animatedRef);
      console.log(layout);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Header startAnimation={startAnimation} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View
          ref={animatedRef}
          animatedProps={animatedProps}
          style={[styles.circle]}
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
});

export default index;
