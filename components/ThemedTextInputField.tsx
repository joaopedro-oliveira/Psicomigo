import React from "react";
import { TextInput, View } from "react-native";
import { useField } from "formik";
import { ThemedText } from "./ThemedText";
import tw from "twrnc";
import {
  TextInputMask,
  TextInputMaskProps,
  TextInputMaskTypeProp,
} from "react-native-masked-text";

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

type InputFieldProps = Overwrite<
  TextInputMaskProps,
  { type?: TextInputMaskTypeProp }
> & {
  name: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: object;
  _mask: boolean;
  id?: string;
  keyboardType?: string;
  onChangeText?: (e: string | React.ChangeEvent<any>) => void;
  onBlur?: (e: any) => void;
  value?: string;
};

export const ThemedTextInputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  secureTextEntry,
  style,
  type,
  _mask,
}) => {
  const [field, { error, touched }] = useField(name);
  return (
    <View>
      {_mask ? (
        <TextInputMask
          type={type!}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={style}
          value={field.value}
          id={field.name}
          onChangeText={field.onChange(name)}
          onBlur={field.onBlur(name)}
        />
      ) : (
        <TextInput
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={style}
          value={field.value}
          id={field.name}
          onChangeText={field.onChange(name)}
          onBlur={field.onBlur(name)}
        />
      )}

      {touched && error ? (
        <View>
          <ThemedText
            lightColor="#ff0000"
            darkColor="#ff0000"
            type="default"
            style={tw`flex max-w-[90%] text-pretty text-red-400 hover:text-red-600 mt-1`}
          >
            {error}
          </ThemedText>
        </View>
      ) : null}
    </View>
  );
};
