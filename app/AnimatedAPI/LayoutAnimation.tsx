import {
  View,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";

//for add, resize , remove views

const PanResponderGesture = () => {
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.spring();
    setExpand(!expand);
  };

  const handleStartAnimation = () => {};

  return (
    <View style={styles.container}>
      <Header startAnimation={handleStartAnimation} />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          onPress={toggleExpand}
          style={{ height: 50, width: 100, backgroundColor: "green" }}
        ></TouchableOpacity>
        {/* <View style={[styles.circle]}></View> */}
        {expand && (
          <View
            style={{ height: 100, width: 100, backgroundColor: "white" }}
          ></View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    backgroundColor: "yellow",
    borderRadius: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#222",
    flexDirection: "column",

    gap: 5,
  },
});

export default PanResponderGesture;
