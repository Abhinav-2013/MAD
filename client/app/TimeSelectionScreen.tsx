import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Sport } from "@/assets/images";
import React from "react";
import BackgroundImage from "@/components/BackgroundImage";
import Button from "@/components/Button";

const timeSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];
// const images = [
//   require("../assets/images/sport1.jpg"),
//   require("../assets/images/sport2.jpg"),
//   require("../assets/images/sport3.jpg"),
//   require("../assets/images/sport4.jpg"),
// ];

export default function TimeSelectionScreen() {
  const { sport, date } = useLocalSearchParams();
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  let sport1 = undefined;
  if (typeof sport === "string") {
    sport1 = (["football", "basketball", "cricket", "tennis", "badminton"].includes(sport) ? sport : undefined) as Sport | undefined;
  }

  return (
    <BackgroundImage sport={sport1} >
      <View style={styles.overlay}>
        <Text style={styles.title}>Select a Time Slot for {sport} on {date}</Text>

        <View style={styles.buttonContainer}>
          {timeSlots.map((time) => (
            // <TouchableOpacity key={time} style={[styles.button, selectedTime === time && styles.selectedButton]} onPress={() => setSelectedTime(time)}>
            //   <Text style={styles.buttonText}>{time}</Text>
            // </TouchableOpacity>
            <Button key={time} buttonPress={() => setSelectedTime(time)} text={time} />
          ))}
        </View>

        {selectedTime && (
          <>
            <Text style={styles.selectedTime}>Selected: {selectedTime}</Text>
            <Button
              buttonPress={() => router.push({ pathname: "/checkavail", params: { sport, date, time: selectedTime } })}
              text="Confirm Time"
            />
          </>
        )}
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center"
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20
  },
  button: {
    backgroundColor: "rgba(128, 128, 128, 0.7)",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    width: 300
  },
  selectedButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)"
  },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      textAlign:"center"
    },
    selectedTime: {
      fontSize: 18,
      color: "#fff",
      marginBottom: 20
    },
});
