import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const tabs = () => {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
};

export default tabs;
