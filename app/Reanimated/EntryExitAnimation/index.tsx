import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideInDown,
  SlideOutLeft,
  SlideOutRight,
  SlideOutUp,
  SlideOutDown,
  BounceIn,
  BounceOut,
} from "react-native-reanimated";

const AnimationList = [
  { name: "FadeIn", entering: FadeIn, exiting: FadeOut },
  { name: "FadeInDown", entering: FadeInDown, exiting: FadeOut },
  { name: "FadeInUp", entering: FadeInUp, exiting: FadeOut },
  { name: "SlideInRight", entering: SlideInRight, exiting: SlideOutRight },
  { name: "SlideInUp", entering: SlideInUp, exiting: SlideOutUp },
  { name: "SlideInDown", entering: SlideInDown, exiting: SlideOutDown },
  { name: "BounceIn", entering: BounceIn, exiting: BounceOut },
];

const Index = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Button title={show ? "Hide" : "Show"} onPress={() => setShow(!show)} />
      {/* <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      > */}
      {show &&
        AnimationList.map((item, index) => {
          return (
            <Animated.View
              key={index}
              style={styles.box}
              entering={item.entering}
              exiting={item.exiting}
            >
              <Text style={styles.text}>{item.name}</Text>
            </Animated.View>
          );
        })}
      {/* </ScrollView> */}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
    padding: 10,
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  box: {
    height: 100,
    width: 200,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    color: "#000",
    fontSize: 14,
    textAlign: "center",
  },
});
