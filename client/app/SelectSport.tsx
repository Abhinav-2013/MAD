import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const images = [
  require("../assets/images/sport1.jpg"),
  require("../assets/images/sport2.jpg"),
  require("../assets/images/sport3.jpg"),
  require("../assets/images/sport4.jpg"),
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

  const handleSelectSport = (sport: string) => {
    router.push({ pathname: "/calendar", params: { sport } });
  };

  return (
    <ImageBackground source={bgImage} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Select a Sport</Text>

        <TouchableOpacity style={styles.button} onPress={() => handleSelectSport("Football")}>
          <Text style={styles.buttonText}>Football</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleSelectSport("Basketball")}>
          <Text style={styles.buttonText}>Basketball</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleSelectSport("Tennis")}>
          <Text style={styles.buttonText}>Tennis</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleSelectSport("Cricket")}>
          <Text style={styles.buttonText}>Cricket</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleSelectSport("Badminton")}>
          <Text style={styles.buttonText}>Badminton</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center", alignItems: "center" },
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.4)", padding: 20, borderRadius: 10, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20, textAlign: "center" },
  button: {
    backgroundColor: "rgba(128, 128, 128, 0.6)",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10, // Adds spacing between buttons
    width: 200, // Sets a uniform width
  },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
});
