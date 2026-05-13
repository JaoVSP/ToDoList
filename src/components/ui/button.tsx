import { Pressable, PressableProps } from "react-native";

export function Button({ onPress, children, ...rest }: PressableProps) {
  return (
    <Pressable {...rest} onPress={onPress}>
      {children}
    </Pressable>
  );
}
