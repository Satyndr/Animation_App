import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const RatingStars = () => {
  const animatedVal = useSharedValue(0);
  const [stars, setStars] = React.useState<number>(0);

  const animateStars = () => {
    animatedVal.value = withTiming(
      1,
      {
        duration: 300,
        easing: Easing.ease,
      },
      () => {
        animatedVal.value = 0;
      }
    );
  };

  const handleStarPress = (index: number) => {
    animateStars();
    setStars(index + 1);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(animatedVal.value, [0, 0.5, 1], [1, 1.5, 1]),
        },
      ],
    };
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {Array.from({ length: 5 }, (_, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => handleStarPress(index)}
          >
            <Animated.View style={index < stars ? animatedStyle : {}}>
              <MaterialCommunityIcons
                name="star"
                size={45}
                // color={index < stars ? "#FFD700" : "#C0C0C0"}
                color={index < stars ? "orange" : "#C0C0C0"}
                style={[{ margin: 5 }]}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

export default RatingStars;
