import { TextInput, TextInputProps } from "react-native";

export function Input({ value, onChangeText, ...rest }: TextInputProps) {
  return <TextInput onChangeText={onChangeText} value={value} {...rest} />;
}
