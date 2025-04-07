import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import React from 'react';

type Props = {
  buttonPress: () => void;
  text: string;
};

export default function Button({ buttonPress, text }: Props) {
  return (
      <TouchableOpacity style={styles.button} onPress={buttonPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(128, 128, 128, 0.6)",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  },
  selectedButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)"
  },
  selectedTime: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20
  },
  confirmButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10
  },
});
