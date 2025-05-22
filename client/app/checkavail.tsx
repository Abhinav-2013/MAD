import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { useRouter } from "expo-router";

const images = [
  require("@/assets/images/sport1.jpg"),
  require("@/assets/images/sport2.jpg"),
  require("@/assets/images/sport3.jpg"),
  require("@/assets/images/sport4.jpg"),
];

export default function CheckAvailability() {
  const router = useRouter();
  const [bgImage, setBgImage] = useState(images[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setBgImage(images[index]);
    }, 3000);
    const timer = setTimeout(() => {
      router.push("/payments");
    }, 4000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <ImageBackground source={bgImage} style={styles.background}>
      <View style={styles.overlay}>
        <Image source={require("../assets/images/football.gif")} style={styles.image} />

        <Text style={styles.title}>Please wait, checking for availability of the slot...</Text>
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
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginTop: 20
  },
  image: {
    width: 100,
    height: 100
  }
});