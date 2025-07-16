import Header from "@/components/Header";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  CurvedTransition,
  EntryExitTransition,
  FadeOut,
  FadingTransition,
  JumpingTransition,
  SequencedTransition,
} from "react-native-reanimated";

interface Item {
  id: number;
  emoji: string;
  color: string;
}

const INITIAL_LIST: Item[] = [
  { id: 1, emoji: "❤️", color: "#b58df1" },
  { id: 2, emoji: "🌟", color: "#f4d03f" },
  { id: 3, emoji: "🦋", color: "#5dade2" },
  { id: 4, emoji: "🌸", color: "#ff9ff3" },
  { id: 5, emoji: "🍀", color: "#2ecc71" },
  { id: 6, emoji: "🌈", color: "#e74c3c" },
  { id: 7, emoji: "✨", color: "#9b59b6" },
  { id: 8, emoji: "🎈", color: "#e67e22" },
  { id: 9, emoji: "🌺", color: "#fd79a8" },
  { id: 10, emoji: "🌙", color: "#34495e" },
];

const index = () => {
  const [items, setItems] = useState<Item[]>(INITIAL_LIST);

  const onRemove = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };
  return (
    <View style={styles.container}>
      <Header backOnly />
      <View style={styles.gridContainer}>
        {items.map((item, index) => {
          return (
            <Animated.View
              key={index}
              style={[styles.box, { backgroundColor: item.color }]}
              layout={FadingTransition}
              // layout={SequencedTransition}
              // layout={JumpingTransition}
              // layout={CurvedTransition}
              //   layout={EntryExitTransition}
              exiting={FadeOut}
            >
              <TouchableOpacity onPress={() => onRemove(item.id)}>
                <Text style={styles.text}>{item.emoji}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
      <View style={{ marginTop: 100 }}>
        <Button
          title="Reset"
          onPress={() => {
            setItems(INITIAL_LIST);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  box: {
    height: 70,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 5,
  },
  text: {
    fontSize: 30,
  },
});

export default index;
