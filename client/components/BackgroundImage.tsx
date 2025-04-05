import { ImageBackground, StyleSheet } from "react-native";
import { useState } from "react";
import { images, Sport } from "@/assets/images";
import React from "react";

type Props = {
  sport: Sport | undefined;
  children: React.ReactNode;
}

export default function BackgroundImage({ sport, children }: Props) {
  if (sport === undefined) {
    console.error("No sport specified!");
    return (
      <ImageBackground source={images["football"]} style={styles.background}>
        {children}
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={images[sport]} style={styles.background}>
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});