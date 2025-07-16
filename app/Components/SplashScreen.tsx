import React from "react";
import { StatusBar, View } from "react-native";
import LottieView from "lottie-react-native";

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222",
      }}
    >
      <StatusBar hidden />
      <LottieView
        style={{ flex: 1, height: "100%", width: "100%" }}
        source={require("@/assets/splash3.json")}
        resizeMode="cover"
        speed={1.3}
        autoPlay
        loop
      />
    </View>
  );
};

export default SplashScreen;
