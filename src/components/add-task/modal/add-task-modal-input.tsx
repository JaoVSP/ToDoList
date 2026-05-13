import { StyleSheet } from "react-native";
import { Input } from "@/components/ui/input";
import { Colors } from "@/constants/theme";
import { useState } from "react";

type AddTaskModalInputProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

export function AddTaskModalInput({ setText, text }: AddTaskModalInputProps) {
  const [isFocusedColor, setIsFocusedColor] = useState(Colors.dark.text);
  return (
    <Input
      onFocus={() => {
        setIsFocusedColor(Colors.dark.dodgerBlue);
      }}
      onBlur={() => {
        setIsFocusedColor(Colors.dark.text);
      }}
      value={text}
      onChangeText={setText}
      maxLength={35}
      style={[{ borderBottomColor: isFocusedColor }, styles.input]}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.dark.text,
    fontSize: 26,
  },

  input: {
    width: 200,
    height: 50,
    padding: 5,
    borderBottomWidth: 0.9,
    color: Colors.dark.text,
  },
});
