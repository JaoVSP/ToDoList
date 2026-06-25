import { StyleProp, ViewStyle, Animated } from "react-native";

interface IModalProps {
  visible: boolean;
  children: React.ReactNode;
  childViewStyle: StyleProp<ViewStyle>;
  parentViewStyle: Animated.WithAnimatedArray<ViewStyle>;
  animation?: Animated.WithAnimatedObject<ViewStyle>;
}

export function Modal({
  visible,
  children,
  childViewStyle,
  parentViewStyle,
  animation,
}: IModalProps) {

  if (!visible) return null;

  return (
    <Animated.View
      style={[parentViewStyle]}
      pointerEvents="auto"
    >
      <Animated.View style={[childViewStyle, animation]}>
        {children}
      </Animated.View>
    </Animated.View>
  );
}
