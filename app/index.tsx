import { Href, Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const Links = [
  {
    link: "/AllAnimatedApi",
    text: "Animated Api",
  },
  {
    link: "/Reanimated",
    text: "Reanimated",
  },
  {
    link: "/GestureHandler",
    text: "Reanimated Gesture Handler",
  },
  {
    link: "/Components",
    text: "Components",
  },
];

export default function Index() {
  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <Text style={[styles.text, { marginTop: 40 }]}>
        Welcome to React Native Animations
      </Text>
      {Links.map((item, index) => (
        <Link key={index} href={item.link as Href} style={styles.textBox}>
          <Text style={styles.normalText}>{item.text} &gt;</Text>
        </Link>
      ))}
    </Animated.View>
  );
}

// export default function Index() {
//   return <></>;
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 25,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
    textDecorationStyle: "solid",
    textDecorationColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#fff",
    padding: 10,
  },
  textBox: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 10,
    // paddingHorizontal: 10,
    width: "70%",
  },
  normalText: {
    color: "#222",
    fontSize: 20,
    textAlign: "center",
  },
});
