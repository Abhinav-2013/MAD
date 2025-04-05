import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";

const images = [
  require("../assets/images/sport1.jpg"),
  require("../assets/images/sport2.jpg"),
  require("../assets/images/sport3.jpg"),
  require("../assets/images/sport4.jpg"),
];

export default function ConfirmationScreen() {
  const { sport, date, time } = useLocalSearchParams();
  const router = useRouter();
  const [bgImage, setBgImage] = useState(images[0]);

  // Slideshow effect
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
        <Text style={styles.title}>Booking Confirmed 🎉</Text>
        <Text style={styles.text}>You have booked the {sport} field on {date} at {time}</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
          <Text style={styles.buttonText}>Go Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  text: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20
  },
  button: {
    backgroundColor: "rgba(128, 128, 128, 0.7)",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
});

