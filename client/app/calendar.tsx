import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { useLocalSearchParams, useRouter } from "expo-router";
import {Sport} from "@/assets/images";
import React from "react";
import BackgroundImage from "@/components/BackgroundImage";
import Button from "@/components/Button";

export default function CalendarScreen() {
  const { sport } = useLocalSearchParams();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  let sport1 = undefined;
  if (typeof sport === "string") {
    sport1 = (["football", "basketball", "cricket", "tennis", "badminton"].includes(sport) ? sport : undefined) as Sport | undefined;
  }

  return (
    <BackgroundImage sport={sport1}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Select a Date for {sport}</Text>

        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={(day: { dateString: React.SetStateAction<string | null>; }) => setSelectedDate(day.dateString)}
            markedDates={{ [selectedDate || ""]: { selected: true, selectedColor: "#4CAF50" } }}
            theme={{
              backgroundColor: "transparent",
              calendarBackground: "rgba(255, 255, 255, 0.2)", // Transparent effect
              textSectionTitleColor: "#fff",
              selectedDayBackgroundColor: "#4CAF50",
              selectedDayTextColor: "#fff",
              todayTextColor: "#FF5733",
              dayTextColor: "#fff",
              textDisabledColor: "#ccc",
              arrowColor: "#4CAF50",
              monthTextColor: "#fff",
            }}
          />
        </View>

        {selectedDate && <Text style={styles.selectedDate}>You selected: {selectedDate}</Text>}

        <Button
          buttonPress={() => selectedDate && router.push({ pathname: "/TimeSelectionScreen", params: { sport, date: selectedDate } })}
          text="Next"
        />
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
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
  calendarContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 10
  },
  selectedDate: {
    marginTop: 10,
    fontSize: 18,
    color: "#fff"
  },
  button: {
    backgroundColor: "rgba(128, 128, 128, 0.6)", // Semi-transparent gray
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  },
});

