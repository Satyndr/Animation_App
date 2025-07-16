import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import React, { useState } from "react";
import Animated, {
  DerivedValue,
  useAnimatedProps,
  useAnimatedRef,
  useDerivedValue,
  useScrollViewOffset,
} from "react-native-reanimated";
import Header from "@/components/Header";

const index = () => {
  const animatedRef = useAnimatedRef<Animated.ScrollView>();

  const scrollOffset = useScrollViewOffset(animatedRef);

  const text = useDerivedValue(
    () => `Scroll Offset ${scrollOffset.value.toFixed(1)}`
  );

  const [isHorizontal, setIsHorizontal] = useState(false);

  return (
    <View style={styles.container}>
      <Header backOnly></Header>
      <AnimatedText text={text} />
      <View style={styles.scroll}>
        <Animated.ScrollView
          ref={animatedRef}
          contentContainerStyle={styles.scrollContent}
          horizontal={isHorizontal}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <View style={styles.box}>
              <Text style={styles.center}>{i}</Text>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
      <Button
        title={isHorizontal ? "scroll vertical" : "scroll horizontal"}
        onPress={() => {
          setIsHorizontal(!isHorizontal);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#222",
    flex: 1,
    paddingTop: 100,
  },
  scroll: {
    borderWidth: 1,
    height: 250,
    width: 250,
    borderColor: "gray",
    margin: 20,
  },
  scrollContent: {
    alignItems: "center",
  },
  box: {
    height: 100,
    width: 100,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b58df1",
  },
  center: {
    textAlign: "center",
  },
});

export default index;

//creating an custom animated text
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

Animated.addWhitelistedNativeProps({ text: true });

function AnimatedText({ text, ...props }: { text: DerivedValue<string> }) {
  const animtedProps = useAnimatedProps(() => ({
    text: text.value,
    defaultValue: text.value,
  }));

  return (
    <AnimatedTextInput
      {...props}
      editable={false}
      value={text.value}
      animatedProps={animtedProps}
      style={{ color: "white" }}
    />
  );
}
