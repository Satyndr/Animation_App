import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import Animated, {
  CurvedTransition,
  FadeIn,
  FadeOut,
  FadingTransition,
  JumpingTransition,
  LinearTransition,
} from "react-native-reanimated";
import Header from "@/components/Header";

const index = () => {
  const INITIAL_LIST = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
  ];

  const [items, setItems] = useState(INITIAL_LIST);
  const idCounter = useRef(4); // Start after initial items

  const addItem = () => {
    const newId = idCounter.current.toString();
    idCounter.current += 1;
    const newItem = {
      id: newId,
      name: `Item ${newId}`,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(() => {
      return items.filter((item) => item.id !== id);
    });
  };

  const renderItem = useMemo(
    () =>
      ({ item }: any) => {
        return (
          <Animated.View entering={FadeIn} style={styles.itemContainer}>
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      },
    [items]
  );

  return (
    <View style={styles.container}>
      <Header backOnly />
      <TouchableOpacity style={styles.addButton} onPress={addItem}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>
      <Animated.FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        // itemLayoutAnimation={LinearTransition}
        // itemLayoutAnimation={FadingTransition}
        // itemLayoutAnimation={CurvedTransition}
        itemLayoutAnimation={JumpingTransition}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: "#333",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
