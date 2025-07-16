import Header from "@/components/Header";
import { Href, Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const Links = [
  {
    link: "/AnimatedAPI/NoLibrary",
    text: "No Library",
  },
  {
    link: "/AnimatedAPI/Basic",
    text: "Animated API",
  },
  {
    link: "/AnimatedAPI/Value",
    text: "Complex Animated API",
  },
  {
    link: "/AnimatedAPI/Interpolation",
    text: "Interpolate",
  },
  {
    link: "/AnimatedAPI/PanResponder",
    text: "Pan Responder",
  },
  {
    link: "/AnimatedAPI/AnimTypes",
    text: "Ways to Animate",
  },
  {
    link: "/AnimatedAPI/NestingAnimations",
    text: "Nested Animations",
  },
  {
    link: "/AnimatedAPI/CustomComponent",
    text: "Custom Animated Components",
  },
  {
    link: "/AnimatedAPI/LayoutAnimation",
    text: "Layout change Animation",
  },
  {
    link: "/AnimatedAPI/ScrollEffect",
    text: "Scroll Effect Header",
  },
];

export default function Index() {
  return (
    <View style={styles.container}>
      {Links.map((item, index) => (
        <Link key={index} href={item.link as Href} style={styles.textBox}>
          <Text style={styles.normalText}>{item.text} &gt;</Text>
        </Link>
      ))}
      <Header backOnly={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  textBox: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  normalText: {
    color: "#222",
    fontSize: 20,
  },
});
