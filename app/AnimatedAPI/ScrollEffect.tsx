import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useAnimatedValue,
  Animated,
} from "react-native";
import React from "react";

const HEADER_HEIGHT = 100;

const ScrollEffect = () => {
  const DATA = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

  const scrollY = useAnimatedValue(0);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT, 40],
    extrapolate: "clamp",
  });

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{item}</Text>
      </View>
    );
  };
  return (
    <View>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Text style={styles.text}>Collapsable Header</Text>
      </Animated.View>
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{}}
      ></Animated.FlatList>
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
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    height: 50,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "#fff", fontSize: 20 },
});

export default ScrollEffect;
