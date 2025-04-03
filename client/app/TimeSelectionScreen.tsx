import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const timeSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];

export default function TimeSelectionScreen() {
  const { sport, date } = useLocalSearchParams();
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Time Slot for {sport} on {date}</Text>
      {timeSlots.map((time) => (
        <Button key={time} title={time} onPress={() => setSelectedTime(time)} />
      ))}
      {selectedTime && (
        <>
          <Text style={styles.selectedTime}>Selected: {selectedTime}</Text>
          <Button title="Confirm Booking" onPress={() => router.push({ pathname: "/ConfirmationScreen", params: { sport, date, time: selectedTime } })} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  selectedTime: { marginTop: 10, fontSize: 18, color: "blue" },
});
