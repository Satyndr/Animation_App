import Header from "@/components/Header";
import { Href, Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const Links = [
  {
    link: "/Reanimated/Methods",
    text: "Methods",
  },
  {
    link: "/Reanimated/Hooks",
    text: "Hooks",
  },
  {
    link: "/Reanimated/ScrollHandler",
    text: "Scroll Handler",
  },
  {
    link: "/Reanimated/ScrollTo",
    text: "ScrollTo",
  },
  {
    link: "/Reanimated/ScrollOffset",
    text: "Scroll Offset",
  },
  {
    link: "/Reanimated/KeyboardHandler",
    text: "Keyboard handler",
  },
  {
    link: "/Reanimated/EntryExitAnimation",
    text: "Entry Exit Animation",
  },
  {
    link: "/Reanimated/LayoutTransition",
    text: "Layout Transition",
  },
  {
    link: "/Reanimated/ListAnimation",
    text: "List Animation",
  },
  {
    link: "/Reanimated/KeyframeAnimation",
    text: "Keyframe Animation",
  },
  {
    link: "/Reanimated/Worklets",
    text: "Animation using Worklets",
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
