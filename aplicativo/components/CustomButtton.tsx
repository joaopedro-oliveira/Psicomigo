import React, { ReactNode } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface CustomButtonProps {
  title?: string;
  onPress: () => void;
  style?: ViewStyle; // Custom style for the button
  textStyle?: TextStyle; // Custom style for the text
  children?: ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  children,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        style,
        { opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={onPress}
    >
      {title && <Text style={[styles.buttonText, textStyle]}>{title}</Text>}
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default CustomButton;
