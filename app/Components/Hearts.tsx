//heart animation
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const HeartContainer = ({ left, color }: { left: number; color: string }) => {
  const animatedVal = useSharedValue(0);

  const animateHearts = () => {
    animatedVal.value = withTiming(1, {
      duration: 1500,
      easing: Easing.ease,
    });
  };
  useEffect(() => {
    animateHearts();
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedVal.value, [0, 1], [1, 0]),
      transform: [
        {
          translateY: interpolate(
            animatedVal.value,
            [0, 1],
            [0, -height * 0.7]
          ),
        },
        {
          translateX: interpolate(
            animatedVal.value,
            [0, 0.25, 0.5, 0.75, 1],
            [0, 25, 15, 0, 10]
          ),
        },
        {
          scale: interpolate(
            animatedVal.value,
            [0, 0.1, 0.13, 1],
            [0, 1.6, 1, 1]
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[styles.heartsContainer, { left: left }, animatedStyle]}
    >
      <MaterialCommunityIcons name="heart" size={50} color={color} />
    </Animated.View>
  );
};

const heartCount = 1;

const Hearts = () => {
  const [heartsList, setHeartsList] = useState<
    { id: number; left: number; color: string }[]
  >([]);

  const addHearts = () => {
    setHeartsList([
      ...heartsList,
      { id: heartCount, left: getRandomPosition(), color: getRandomColor() },
    ]);
  };

  const getRandomColor = () => {
    const colors = ["red", "pink", "#DE3163", "#D2042D", "#F88379"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const addMultipleHearts = () => {
    const timer = setInterval(() => {
      if (heartsList.length < 10) {
        setHeartsList((prev) => [
          ...prev,
          {
            id: heartCount + prev.length,
            left: getRandomPosition(),
            color: getRandomColor(),
          },
        ]);
      } else {
        clearInterval(timer);
      }
    }, 300);
    return () => clearInterval(timer);
  };

  const removeHeart = (id: number) => {
    setHeartsList(heartsList.filter((heart) => heart.id !== id));
  };

  const getRandomPosition = () => {
    const x = Math.floor(Math.random() * (width - 150));
    return x;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (heartsList.length > 0) {
        removeHeart(heartsList[0].id);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [heartsList]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {heartsList.map((heart, index) => (
          <HeartContainer key={index} left={heart.left} color={heart.color} />
        ))}
      </View>
      <TouchableOpacity
        onPress={addHearts}
        // onPressIn={addMultipleHearts}
        style={{
          position: "absolute",
          bottom: 50,
          right: 50,
        }}
      >
        <MaterialCommunityIcons name="heart-outline" size={50} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  heartsContainer: {
    position: "absolute",
    bottom: 50,
  },
  heart: {
    width: 50,
    height: 50,
    alignItems: "center",
  },
});

export default Hearts;
