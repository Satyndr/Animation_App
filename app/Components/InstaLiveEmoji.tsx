import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

// Floating Emoji Component
const FloatingEmoji = ({
  emoji,
  left,
  bottom,
}: {
  emoji: string;
  left: number;
  bottom: number;
}) => {
  const animatedVal = useSharedValue(0);

  const animateEmoji = () => {
    animatedVal.value = withTiming(1, {
      duration: 1000,
      easing: Easing.ease,
    });
  };

  useEffect(() => {
    animateEmoji();
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedVal.value, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
      transform: [
        {
          translateY: interpolate(
            animatedVal.value,
            [0, 1],
            [0, -height * 0.6]
          ),
        },
        {
          translateX: interpolate(
            animatedVal.value,
            [0, 0.25, 0.5, 0.75, 1],
            [0, 20, -15, 10, -5]
          ),
        },
        {
          scale: interpolate(
            animatedVal.value,
            [0, 0.1, 0.15, 1],
            [0, 1.5, 1, 0.8]
          ),
        },
        // {
        //   rotate: `${interpolate(
        //     animatedVal.value,
        //     [0, 0.5, 1],
        //     [0, 180, 360]
        //   )}deg`,
        // },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.floatingEmoji,
        { left: left, bottom: bottom },
        animatedStyle,
      ]}
    >
      <Text style={styles.emojiText}>{emoji}</Text>
    </Animated.View>
  );
};

const InstaLiveEmoji = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<
    { id: number; emoji: string; left: number; bottom: number }[]
  >([]);
  const animVal = useSharedValue(0);

  const getRandomPosition = () => {
    return Math.floor(Math.random() * (width - 100));
  };

  const addFloatingEmoji = (emoji: string) => {
    const newEmoji = {
      id: Date.now() + Math.random(),
      emoji,
      left: getRandomPosition(),
      bottom: 120,
    };
    setFloatingEmojis((prev) => [...prev, newEmoji]);

    // Remove emoji after animation completes
    setTimeout(() => {
      setFloatingEmojis((prev) =>
        prev.filter((item) => item.id !== newEmoji.id)
      );
    }, 2000);
  };

  const animate = () => {
    animVal.value = withTiming(1, {
      duration: 200,
    });
  };
  const animateBack = () => {
    animVal.value = withTiming(0, {
      duration: 200,
    });
  };

  const rotateAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(animVal.value, [0, 1], [0, 45])}deg`,
        },
      ],
    };
  });

  const widthAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(animVal.value, [0, 1], [60, 250]),
    };
  });

  const andarBahar = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animVal.value, [0, 1], [0, 1]),
      transform: [
        {
          translateX: interpolate(animVal.value, [0, 1], [50, -5]),
        },
        {
          scale: interpolate(animVal.value, [0, 1], [0, 1]),
        },
      ],
    };
  });

  const handleMenuPress = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      animate();
    } else {
      setIsMenuOpen(false);
      animateBack();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, position: "relative" }}>
        {/* Floating Emojis */}
        {floatingEmojis.map((item) => (
          <FloatingEmoji
            key={item.id}
            emoji={item.emoji}
            left={item.left}
            bottom={item.bottom}
          />
        ))}

        {/* Main Menu Container */}
        <Animated.View
          style={[
            {
              height: 60,
              borderRadius: 90,
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              position: "absolute",
              bottom: 50,
              right: 50,
              flexDirection: "row",
              backgroundColor: "white",
              justifyContent: "flex-end",
              alignItems: "center",
            },
            widthAnimatedStyle,
          ]}
        >
          <Animated.View
            style={[
              styles.emoji,
              !isMenuOpen && { display: "none" },
              andarBahar,
            ]}
          >
            <Pressable onPress={() => addFloatingEmoji("🤣")}>
              <Text style={{ fontSize: 30 }}>🤣</Text>
            </Pressable>
          </Animated.View>

          <Animated.View
            style={[
              styles.emoji,
              !isMenuOpen && { display: "none" },
              andarBahar,
            ]}
          >
            <Pressable onPress={() => addFloatingEmoji("❤️")}>
              <Text style={{ fontSize: 30 }}>❤️</Text>
            </Pressable>
          </Animated.View>

          <Animated.View
            style={[
              styles.emoji,
              !isMenuOpen && { display: "none" },
              andarBahar,
            ]}
          >
            <Pressable onPress={() => addFloatingEmoji("👍")}>
              <Text style={{ fontSize: 30 }}>👍</Text>
            </Pressable>
          </Animated.View>
          <Pressable onPress={handleMenuPress}>
            <Animated.View style={[rotateAnimatedStyle, styles.emojiButton]}>
              <MaterialCommunityIcons name="plus" size={30} color="grey" />
            </Animated.View>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
};

export default InstaLiveEmoji;

const styles = StyleSheet.create({
  emojiButton: {
    height: "100%",
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    height: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingEmoji: {
    position: "absolute",
    zIndex: 1000,
  },
  emojiText: {
    fontSize: 50,
  },
});
