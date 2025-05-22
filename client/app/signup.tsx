import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/Button";

const images = [
  require("@/assets/images/sport1.jpg"),
  require("@/assets/images/sport2.jpg"),
  require("@/assets/images/sport3.jpg"),
  require("@/assets/images/sport4.jpg"),
];

export default function SignUpScreen() {
  const router = useRouter();
  const [bgImage, setBgImage] = useState(images[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setBgImage(images[index]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSignUp = () => {
    console.log({ name, email, password });
    router.push("/home");
  };

  return (
    <ImageBackground source={bgImage} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#fff"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#fff"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#fff"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button buttonPress={handleSignUp} text="Sign Up" />
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
    alignItems: "center",
    width: "80%"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "100%",
    color: "#fff"
  }
});
