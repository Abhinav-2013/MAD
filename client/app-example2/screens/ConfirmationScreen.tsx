import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type ConfirmationScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Confirmation'>;
  route: RouteProp<RootStackParamList, 'Confirmation'>;
};

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ route, navigation }) => {
  const { sport, date } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Confirmed 🎉</Text>
      <Text>You have booked the {sport} field on {date}</Text>
      <Button title="Go Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});

export default ConfirmationScreen;
