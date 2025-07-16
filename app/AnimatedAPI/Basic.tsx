import { View, Text, StyleSheet, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import Header from "@/components/Header";

//Rule for animation - V C F
//v - make view
//c - connect to component
//f - create function

const Basic = () => {
  const position = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(position, {
      toValue: 200,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(position, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    });
  };

  //   useEffect(() => {
  //     startAnimation();
  //   }, []);

  return (
    <View style={styles.container}>
      <Header startAnimation={startAnimation} />

      <Animated.View
        style={[styles.box, { marginLeft: position }]}
      ></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: "yellow",
  },
  container: {
    flex: 1,
    backgroundColor: "#222",
    flexDirection: "column",
  },
});

export default Basic;
