import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/Button";

const images = [
  require("@/assets/images/sport1.jpg"),
  require("@/assets/images/sport2.jpg"),
  require("@/assets/images/sport3.jpg"),
  require("@/assets/images/sport4.jpg"),
];

export default function LoginScreen() {
  const router = useRouter();
  const [bgImage, setBgImage] = useState(images[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setBgImage(images[index]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground source={bgImage} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to the Sports Booking App</Text>
        <Button buttonPress={() => router.push("/login2")} text="Login" />
        <Button buttonPress={() => router.push("/signup")} text="Sign Up" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20
  }
});
