import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";

const floatingButton = () => {
  const animatedVal = useSharedValue(0);

  function animation() {
    console.log("Animation Triggered");
    animatedVal.value = withSpring(animatedVal.value === 0 ? 1 : 0, {
      mass: 1,
      damping: 13,
      stiffness: 130,
    });
  }

  const primaryButtonStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(animatedVal.value, [0, 1], [0, 45])}deg`,
      },
    ],
  }));

  const locationButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(animatedVal.value, [0, 1], [0, -80]),
        },
      ],
    };
  });
  const cameraButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(animatedVal.value, [0, 1], [0, -160]),
        },
      ],
    };
  });
  const chatButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(animatedVal.value, [0, 1], [0, -240]),
        },
      ],
    };
  });

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: "#007AFF11"
      }}
    >
      <View
        style={{
          marginTop: 50,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Floating Button</Text>
      </View>
      <View
        style={{
          flex: 1,
          position: "absolute",
          alignItems: "center",
          bottom: "20%",
          left: "50%",
          transform: [{ translateX: "-50%" }],
          //   backgroundColor: "red",
        }}
      >
        <TouchableWithoutFeedback>
          <Animated.View
            style={[styles.secondaryButton, styles.shadow, chatButtonStyle]}
          >
            {/* chat icon */}
            <MaterialCommunityIcons name="chat" size={35} color="#007AFF" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Animated.View
            style={[styles.secondaryButton, styles.shadow, cameraButtonStyle]}
          >
            {/* camera icon */}
            <MaterialCommunityIcons name="camera" size={35} color="#007AFF" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Animated.View
            style={[styles.secondaryButton, styles.shadow, locationButtonStyle]}
          >
            {/* location icon */}
            <MaterialCommunityIcons
              name="map-marker"
              size={35}
              color="#007AFF"
            />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={animation}>
          <Animated.View
            style={[styles.primaryButton, styles.shadow, primaryButtonStyle]}
          >
            {/* plus icon */}
            <MaterialCommunityIcons name="plus" size={40} color="#fff" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    width: 80,
    height: 80,
    backgroundColor: "#007AFF",
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  secondaryButton: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    // borderWidth: 2,
    // borderColor: "#007AFF",
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 3,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default floatingButton;
