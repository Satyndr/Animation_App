import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import Animated, {
  scrollTo,
  SharedValue,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import Header from "@/components/Header";

const ITEM_SIZE = 100;
const ITEM_MARGIN = 10;
const ITEM_COUNT = 10;

const item = Array.from({ length: ITEM_COUNT }, (_, i) => `Item ${i + 1}`);

const index = () => {
  const scroll = useSharedValue<number>(0);
  const animatedRef = useAnimatedRef<Animated.ScrollView>();

  useDerivedValue(() => {
    scrollTo(
      animatedRef,
      0,
      scroll.value * (ITEM_SIZE + 2 * ITEM_MARGIN),
      true
    );
  });

  return (
    <View style={styles.container}>
      <Header />
      <Incrementer increment={-1} scroll={scroll} />
      <View style={styles.scrollContainer}>
        <Animated.ScrollView ref={animatedRef}>
          {item.map((item, index) => (
            <View key={index} style={styles.box}>
              <Text style={styles.boxText}>{item}</Text>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
      <Incrementer increment={1} scroll={scroll} />
    </View>
  );
};

const Incrementer = ({
  increment,
  scroll,
}: {
  increment: number;
  scroll: SharedValue<number>;
}) => {
  return (
    <View style={styles.buttonWrapper}>
      <Button
        onPress={() => {
          scroll.value = (scroll.value + increment + ITEM_COUNT) % ITEM_COUNT;
        }}
        title={`Scroll ${Math.abs(increment)} ${increment > 0 ? "down" : "up"}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#222",
    paddingTop: 150,
  },
  buttonWrapper: {
    marginBottom: 20,
  },
  scrollContainer: {
    width: "100%",
    height: 250,
    alignItems: "center",
  },
  box: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: ITEM_MARGIN,
    borderRadius: 15,
    backgroundColor: "#b59df1",
    alignItems: "center",
    justifyContent: "center",
  },
  boxText: {
    textAlign: "center",
  },
});

export default index;
