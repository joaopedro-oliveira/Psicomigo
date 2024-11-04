import React, { ReactNode } from "react";
import {
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  ViewStyle,
} from "react-native";
import {
  TouchableWithoutFeedback,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

interface MyFormWrapperProps {
  children: ReactNode;
  style?: ViewStyle;
}

export const KeyboardWrapper: React.FC<MyFormWrapperProps> = ({
  children,
  style,
}) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {Platform.OS === "ios" || Platform.OS === "android" ? (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {children}
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : (
        <>{children}</>
      )}
    </GestureHandlerRootView>
  );
};
