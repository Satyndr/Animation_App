import { View, Text } from "react-native";
import React from "react";
import Navigator from "@/components/Navigator";

const Links = [
  {
    link: "/Components/onboarding/First",
    text: "Onboarding Screen 1",
  },
];

const index = () => {
  return <Navigator Links={Links} />;
};

export default index;
