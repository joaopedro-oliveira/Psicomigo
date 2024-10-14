import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle; // Custom style for the button
  textStyle?: TextStyle; // Custom style for the text
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, style, textStyle }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        style,
        { opacity: pressed ? 0.7 : 1 }, // Optional pressed effect
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF', // Default button color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Default text color
    fontSize: 16,
  },
});

export default CustomButton;