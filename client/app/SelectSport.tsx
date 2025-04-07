import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Sport } from "@/assets/images";
// import images from "../components/images";
import React from "react";
import Button from "@/components/Button";

const images = [
  require("@/assets/images/sport1.jpg"),
  require("@/assets/images/sport2.jpg"),
  require("@/assets/images/sport3.jpg"),
  require("@/assets/images/sport4.jpg"),
];

export default function SportSelectionScreen() {
  const router = useRouter();
  const [bgImage, setBgImage] = useState(images[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setBgImage(images[index]);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleSelectSport = (rawValue: string) => {
    const sport = (["football", "basketball", "cricket", "tennis", "badminton"].includes(rawValue) ? rawValue : undefined) as Sport | undefined;
    router.push({ pathname: "/calendar", params: { sport } });
  };

  return (
    <ImageBackground source={bgImage} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Select a Sport</Text>

        <Button buttonPress={() => handleSelectSport("football")} text="Football" />

        <Button buttonPress={() => handleSelectSport("basketball")} text="Basketball" />

        <Button buttonPress={() => handleSelectSport("tennis")} text="Tennis" />

        <Button buttonPress={() => handleSelectSport("cricket")} text={"Cricket"} />

        <Button buttonPress={() => handleSelectSport("badminton")} text="Badminton" />

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
    marginBottom: 20,
    textAlign: "center"
  },
});
