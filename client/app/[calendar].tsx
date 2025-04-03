import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { Calendar } from "react-native-calendars";
import { useLocalSearchParams, useRouter } from "expo-router";

const images = [
  require("../assets/images/sport1.jpg"),
  require("../assets/images/sport2.jpg"),
  require("../assets/images/sport3.jpg"),
  require("../assets/images/sport4.jpg"),
];

export default function CalendarScreen() {
  const { sport } = useLocalSearchParams();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
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
        <Text style={styles.title}>Select a Date for {sport}</Text>

        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => selectedDate && router.push({ pathname: "/TimeSelectionScreen", params: { sport, date: selectedDate } })}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center", alignItems: "center" },
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.4)", padding: 20, borderRadius: 10, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20, textAlign: "center" },
  calendarContainer: { backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: 10, padding: 10 }, // Transparent
  selectedDate: { marginTop: 10, fontSize: 18, color: "#fff" },
  button: {
    backgroundColor: "rgba(128, 128, 128, 0.6)", // Semi-transparent gray
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
});

