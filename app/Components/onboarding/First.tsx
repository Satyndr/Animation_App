import { View, Text, Image, TouchableOpacity } from "react-native";
import { useWindowDimensions } from "react-native";
import React, { useRef } from "react";
import Animated, {
  clamp,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const List = [
  {
    id: "1",
    image: require("@/assets/images/img1.avif"),
    Title: "React Native",
    Description: "Build native apps using React",
  },
  {
    id: "2",
    image: require("@/assets/images/img2.jpg"),
    Title: "React Native",
    Description: "Build native apps using React",
  },
  {
    id: "3",
    image: require("@/assets/images/img3.png"),
    Title: "React Native",
    Description: "Build native apps using React",
  },
];

const First = () => {
  const { width } = useWindowDimensions();
  const x = useSharedValue(0);
  const flatListRef = useRef<Animated.FlatList<any>>(null);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const setNext = () => {
    if (x.value < width * (List.length - 1)) {
      const nextIndex =
        Math.floor(clamp(x.value / width, 0, List.length - 1)) + 1;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          height: "65%",
          justifyContent: "center",
          alignItems: "center",
          //   backgroundColor: "red",
        }}
      >
        <Animated.FlatList
          ref={flatListRef}
          data={List}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          keyExtractor={(item) => item.id}
          onScroll={onScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View
              style={{
                width: width,
                height: "100%",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "#fff",
                  marginBottom: "15%",
                }}
                source={item.image}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "#000",
                  marginTop: 10,
                }}
              >
                {item.Title}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#000",
                  textAlign: "center",
                  marginTop: 5,
                  width: "80%",
                }}
              >
                {item.Description}
              </Text>
            </View>
          )}
        />
      </View>
      <Pagination x={x} />
      <Arrow x={x} next={setNext} />
    </View>
  );
};

const Arrow = ({
  x,
  next,
}: {
  x: Animated.SharedValue<number>;
  next: () => void;
}) => {
  return (
    <View
      style={{
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          height: 70,
          width: 70,
          borderRadius: 999,
          backgroundColor: "purple",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={next}
      >
        {/* right arrow */}
        <MaterialCommunityIcons name="arrow-right" size={40} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const Pagination = ({ x }: { x: Animated.SharedValue<number> }) => {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        height: "10%",
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: "5%",
      }}
    >
      {List.map((_, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const widthAnimation = interpolate(
            x.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [10, 40, 10]
          );

          const animatedOpacity = interpolate(
            x.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.3, 1, 0.3]
          );

          return {
            width: widthAnimation,
            opacity: animatedOpacity,
          };
        });
        return (
          <Animated.View
            key={index}
            style={[
              animatedStyle,
              {
                height: 5,
                marginRight: 5,
                borderRadius: 99,
                backgroundColor: "#000",
                alignSelf: "center",
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default First;
