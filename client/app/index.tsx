import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const images = [
  require("../assets/images/sport1.jpg"),
  require("../assets/images/sport2.jpg"),
  require("../assets/images/sport3.jpg"),
  require("../assets/images/sport4.jpg"),
];

export default function HomeScreen() {
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

  return (
    <ImageBackground source={bgImage} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to the Sports Booking App</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/SelectSport")}>
          <Text style={styles.buttonText}>Select Sport</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center", alignItems: "center" },
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.4)", padding: 20, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 20 },
  button: {
    backgroundColor: "rgba(128, 128, 128, 0.6)",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
});

