import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type CalendarScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SelectTime'>;
  route: RouteProp<RootStackParamList, 'SelectTime'>;
};

const CalendarScreen: React.FC<CalendarScreenProps> = ({ navigation, route }) => {
  const { sport } = route.params;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Date for {sport}</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{ [selectedDate || '']: { selected: true, selectedColor: 'blue' } }}
      />
      {selectedDate && <Text style={styles.selectedDate}>You selected: {selectedDate}</Text>}
      <Button
        title="Confirm Booking"
        onPress={() => selectedDate && navigation.navigate('Confirmation', { sport, date: selectedDate })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  selectedDate: { marginTop: 10, fontSize: 18, color: 'blue' },
});

export default CalendarScreen;
