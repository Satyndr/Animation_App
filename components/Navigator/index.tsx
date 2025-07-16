import Header from "@/components/Header";
import { Href, Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Navigator({
  Links,
}: {
  Links: { link: string; text: string }[];
}) {
  return (
    <GestureHandlerRootView style={styles.container}>
      {Links.map((item, index) => (
        <Link key={index} href={item.link as Href} style={styles.textBox}>
          <Text style={styles.normalText}>{item.text} &gt;</Text>
        </Link>
      ))}
      <Header backOnly={true} />
    </GestureHandlerRootView>
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
