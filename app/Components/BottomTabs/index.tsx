import { View, Text } from "react-native";
import React from "react";
import Navigator from "@/components/Navigator";

const Links = [
  {
    link: "/Components/BottomTabs/tabs",
    text: "Tabs",
  },
];

const index = () => {
  return <Navigator Links={Links} />;
};

export default index;
