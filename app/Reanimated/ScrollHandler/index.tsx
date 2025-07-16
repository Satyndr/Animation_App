import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from "react-native-reanimated";

const HEADER_HEIGHT = 200;
const MIN_HEADER_HEIGHT = 100;

const index = () => {
  const scrollY = useSharedValue(0);
  const headerHeight = useSharedValue(HEADER_HEIGHT);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      headerHeight.value = withSpring(
        Math.max(HEADER_HEIGHT - scrollY.value, MIN_HEADER_HEIGHT),
        { damping: 15 }
      );
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: headerHeight.value,
    };
  });

  return (
    <View style={{ backgroundColor: "#222" }}>
      <Animated.View style={[styles.header, headerStyle]}>
        <Text style={[styles.text, { color: "#000" }]}>Collapsable Header</Text>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >
        {Array.from({ length: 30 }).map((_, index) => (
          <View style={styles.item} key={index}>
            <Text style={styles.text} key={index}>
              Item {index + 1}
            </Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    backgroundColor: "peachpuff",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  item: {
    height: 50,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "#fff", fontSize: 20, marginBottom: 10 },
});

export default index;
