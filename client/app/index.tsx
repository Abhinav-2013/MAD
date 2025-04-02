import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SportSelectionScreen from './screens/SportSelectionScreen';
import CalendarScreen from './screens/CalendarScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';

export type RootStackParamList = {
  Home: undefined;
  SelectSport: undefined;
  SelectTime: { sport: string };
  Confirmation: { sport: string; date: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SelectSport" component={SportSelectionScreen} />
        <Stack.Screen name="SelectTime" component={CalendarScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      </Stack.Navigator>
  );
}
