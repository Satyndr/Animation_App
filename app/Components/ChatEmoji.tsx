import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, use } from "react";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  runOnJS,
  withSpring,
} from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const EmojisList = ["😂", "❤️", "😮", "🥰"];

const ReactedEmoji = ({ reactedEmoji }: { reactedEmoji: string | null }) => {
  const reactedEmojiAnim = useSharedValue(0);

  useEffect(() => {
    reactedEmojiAnim.value = withSpring(1, {
      damping: 10,
      stiffness: 100,
    });
    // Reset the animation after it completes
    setTimeout(() => {
      reactedEmojiAnim.value = withSpring(0, {
        damping: 11,
        stiffness: 100,
      });
    }, 1000);
  }, [reactedEmoji]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(reactedEmojiAnim.value, [0, 1], [0, -50]),
      },
      {
        scale: interpolate(reactedEmojiAnim.value, [0, 1], [1, 3]),
      },
    ],
  }));

  return (
    <View
      style={{
        position: "absolute",
        bottom: -15,
        left: 10,
        zIndex: 1000,
        backgroundColor: "white",
        borderRadius: 50,
        padding: 5,
        aspectRatio: 1,
      }}
    >
      <Animated.View style={animatedStyle}>
        <Text style={{ fontSize: 15 }}>{reactedEmoji}</Text>
      </Animated.View>
    </View>
  );
};

const ChatEmoji = () => {
  const [isEmojiMenuOpen, setIsEmojiMenuOpen] = useState(false);
  const [emojiToPop, setEmojiToPop] = useState<string | null>(null);
  const [reactedEmoji, setReactedEmoji] = useState<string | null>(null);
  const animVal = useSharedValue(0);

  const handleChatLongPress = () => {
    animVal.value = withSequence(
      withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) }),
      withTiming(0, { duration: 200 })
    );
    // Also open the emoji menu
    setIsEmojiMenuOpen(true);
  };

  useEffect(() => {
    if (!emojiToPop) return;
    setReactedEmoji(emojiToPop);
  }, [emojiToPop]);

  const chatAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(animVal.value, [0, 1], [1, 0.9]) }],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          {
            height: 350,
            width: 200,
            backgroundColor: "#ccc",
            borderRadius: 20,
            position: "absolute",
            right: 20,
            top: "20%",
          },
          chatAnimStyle,
        ]}
      >
        {emojiToPop && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <PopingEmojis emoji={emojiToPop} setEmojiToPop={setEmojiToPop} />
          </View>
        )}
        {/* Main Chat Area */}
        <Pressable
          onLongPress={handleChatLongPress}
          style={{ flex: 1, position: "relative" }}
        >
          <View
            style={{
              position: "absolute",
              bottom: "30%",
              right: 20,
            }}
          >
            <InstaLiveEmoji
              isMenuOpen={isEmojiMenuOpen}
              setIsMenuOpen={setIsEmojiMenuOpen}
              setEmojiToPop={setEmojiToPop}
              setReactedEmoji={setReactedEmoji}
            />
          </View>
        </Pressable>

        {/* Reacted Emoji */}

        {reactedEmoji && <ReactedEmoji reactedEmoji={reactedEmoji} />}
      </Animated.View>
    </View>
  );
};

const InstaLiveEmoji = ({
  isMenuOpen,
  setIsMenuOpen,
  setEmojiToPop,
  setReactedEmoji,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  setEmojiToPop: (value: string | null) => void;
  setReactedEmoji: (value: string | null) => void;
}) => {
  const animVal = useSharedValue(0);
  const emojiY = useSharedValue(0);
  const emojiScale = useSharedValue(1);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  // Effect to trigger animation when isMenuOpen changes from parent
  useEffect(() => {
    if (isMenuOpen) {
      animate();
    } else {
      animateBack();
    }
  }, [isMenuOpen]);

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

  const widthAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(animVal.value, [0, 1], [50, 260]),
      height: interpolate(animVal.value, [0, 1], [0, 50]),
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
    } else {
      setIsMenuOpen(false);
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setReactedEmoji(emoji);
    setIsMenuOpen(false);
  };

  const handleEmojiLongPress = (emoji: string) => {
    setSelectedEmoji(emoji);
    emojiY.value = withTiming(-100, {
      duration: 300,
    });
    emojiScale.value = withTiming(
      2,
      {
        duration: 1500,
      },
      (finished) => {
        if (finished) {
          runOnJS(setEmojiToPop)(emoji);
          runOnJS(setIsMenuOpen)(false);
        }
      }
    );

    // Reset the emoji scale after some time
    setTimeout(() => {
      emojiScale.value = withTiming(1, {
        duration: 300,
      });
      emojiY.value = withTiming(0, {
        duration: 300,
      });
    }, 1500);
    setTimeout(() => {
      setSelectedEmoji(null);
    }, 1800);
  };

  const handleEmojiPressout = () => {
    emojiY.value = withTiming(0, {
      duration: 300,
    });
    emojiScale.value = withTiming(1, {
      duration: 300,
    });
    setTimeout(() => {
      setSelectedEmoji(null);
    }, 600);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, position: "relative" }}>
        {/* Main Menu Container */}
        <Animated.View
          style={[
            {
              borderRadius: 90,
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              position: "relative",
              // bottom: 50,
              // right: 0,
              flexDirection: "row",
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            },
            widthAnimatedStyle,
          ]}
        >
          {EmojisList.map((emoji, idx) => {
            const combinedAnimatedStyle = useAnimatedStyle(() => {
              if (selectedEmoji === emoji) {
                return {
                  transform: [
                    { translateY: emojiY.value },
                    { scale: emojiScale.value },
                    {
                      rotate: `${interpolate(
                        emojiScale.value,
                        [1, 1.2, 1.4, 1.6, 1.8, 2],
                        [-5, 5, -5, 5, -10, 10, -10, 10]
                      )}deg`,
                    },
                  ],
                };
              }
              return {};
            });

            return (
              <Animated.View
                key={emoji}
                style={[
                  styles.emoji,
                  !isMenuOpen && { display: "none" },
                  andarBahar,
                  combinedAnimatedStyle,
                ]}
              >
                <Pressable
                  onPress={() => handleEmojiClick(emoji)}
                  onLongPress={() => handleEmojiLongPress(emoji)}
                  onPressOut={handleEmojiPressout}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 30, textAlign: "center" }}>
                    {emoji}
                  </Text>
                </Pressable>
              </Animated.View>
            );
          })}
          <Pressable onPress={handleMenuPress}>
            <Animated.View style={[styles.emojiButton]}>
              <MaterialCommunityIcons name="plus" size={30} color="grey" />
            </Animated.View>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
};

const PopingEmojis = ({
  emoji,
  setEmojiToPop,
}: {
  emoji: string | null;
  setEmojiToPop: (emoji: string | null) => void;
}) => {
  const total = 30;
  const batchSize = 10;
  const batchDelay = 200;
  const getRandomRotation = () => Math.random() * 90 - 45;

  const positions = Array.from({ length: total }).map(() => ({
    x: useSharedValue(0),
    y: useSharedValue(0),
    scale: useSharedValue(0),
    rotation: getRandomRotation(),
  }));

  const getRandomDuration = () => Math.random() * 400 + 350;
  const getRandomXPosition = () => Math.random() * 320 - 170;
  const getRandomYPosition = () => Math.random() * -250 + 50;
  const getRandomScale = () => Math.random() * 1 + 1.4;

  const animateBatch = (start: number, end: number, isLast: boolean) => {
    for (let i = start; i < end; i++) {
      const pos = positions[i];
      pos.x.value = withTiming(getRandomXPosition(), {
        duration: getRandomDuration(),
        easing: Easing.bezier(0.61, 1, 0.88, 1),
      });
      pos.scale.value = withTiming(getRandomScale(), {
        duration: 1200,
        easing: Easing.out(Easing.ease),
      });

      pos.y.value = withTiming(
        getRandomYPosition(),
        {
          duration: getRandomDuration(),
          easing: Easing.bezier(0.61, 1, 0.88, 1),
        },
        (finished) => {
          if (finished) {
            pos.y.value = withTiming(
              pos.y.value - 700,
              // { duration: Math.random() * 200 + 2500 },
              { duration: 3000 },
              (finished) => {
                if (finished && isLast && i === end - 1) {
                  runOnJS(setEmojiToPop)(null);
                }
              }
            );
          }
        }
      );
    }
  };

  useEffect(() => {
    for (let batch = 0; batch < total / batchSize; batch++) {
      setTimeout(() => {
        const start = batch * batchSize;
        const end = start + batchSize;
        const isLast = batch === total / batchSize - 1;
        animateBatch(start, end, isLast);
      }, batch * batchDelay);
    }
  }, []);

  return (
    <>
      {positions.map((pos, i) => {
        const style = useAnimatedStyle(() => ({
          transform: [
            { translateX: pos.x.value },
            { translateY: pos.y.value },
            { scale: pos.scale.value },
            { rotate: `${pos.rotation}deg` },
          ],
        }));

        return (
          <Animated.View key={i} style={[styles.emojiContainer, style]}>
            <Text style={styles.emoji}>{emoji}</Text>
          </Animated.View>
        );
      })}
    </>
  );
};

export default ChatEmoji;

const styles = StyleSheet.create({
  emojiButton: {
    height: "100%",
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "45deg" }],
    // position: "absolute",
  },
  emoji: {
    height: "100%",
    aspectRatio: 1,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // position: "absolute",
  },
  floatingEmoji: {
    position: "absolute",
    zIndex: 1000,
  },
  emojiText: {
    fontSize: 50,
  },
  emojiContainer: {
    position: "absolute",
    left: 25,
    top: height / 2,
  },
  emoj: {
    fontSize: 40,
  },
});
