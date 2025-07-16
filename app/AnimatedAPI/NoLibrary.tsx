import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";

const NoLibrary = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev < 250 ? prev + 5 : 0));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={[styles.box, { marginLeft: position }]}></View>
    </View>
  );
};

export default NoLibrary;

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
