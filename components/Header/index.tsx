import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const Header = ({
  startAnimation,
  backOnly = false,
}: {
  startAnimation?: () => void;
  backOnly?: boolean;
}) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      {!backOnly && (
        <TouchableOpacity style={styles.button} onPress={startAnimation}>
          <Text style={styles.buttonText}>Start Animation</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    margin: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#fff",
    padding: 10,
  },
  buttonText: {
    color: "#fff",
  },
});

export default Header;
