import { useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function CalendarScreen() {
  const { sport } = useLocalSearchParams();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Date for {sport}</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{ [selectedDate || ""]: { selected: true, selectedColor: "blue" } }}
      />
      {selectedDate && <Text style={styles.selectedDate}>You selected: {selectedDate}</Text>}
      <Button title="Next" onPress={() => selectedDate && router.push({ pathname: "/time", params: { sport, date: selectedDate } })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  selectedDate: { marginTop: 10, fontSize: 18, color: "blue" },
});
