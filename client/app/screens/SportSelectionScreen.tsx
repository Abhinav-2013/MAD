import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type SportSelectionProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SelectSport'>;
};

const SportSelectionScreen: React.FC<SportSelectionProps> = ({ navigation }) => {
  const sports = ['Soccer', 'Tennis', 'Basketball', 'Cricket'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Sport</Text>
      {sports.map((sport, index) => (
        <Button key={index} title={sport} onPress={() => navigation.navigate('SelectTime', { sport })} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});

export default SportSelectionScreen;
