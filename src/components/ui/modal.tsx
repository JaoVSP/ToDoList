import { useEffect, useState } from "react";
import { StyleProp, ViewStyle, Animated } from "react-native";

interface IModalProps {
  visible: boolean;
  children: React.ReactNode;

  childViewStyle: StyleProp<ViewStyle>;
  parentViewStyle: Animated.WithAnimatedArray<ViewStyle>;
  animation?: Animated.WithAnimatedObject<ViewStyle>;
  openModal?: () => void;
  closeModal?: () => void;
}

export function Modal({
  visible,
  children,
  childViewStyle,
  parentViewStyle,
  animation,
}: IModalProps) {
  const [mounted, setMounted] = useState(visible);
  const visibility = visible == true ? "flex" : "none";

  useEffect(() => {
    if (visible) {
      setMounted(true);
    } else if (mounted) {
      setMounted(false);
    }
  }, [visible]);

  if (!mounted) return null;

  return (
    <Animated.View
      style={[parentViewStyle, { display: visibility }]}
      pointerEvents="auto"
    >
      <Animated.View style={[childViewStyle, animation]}>
        {children}
      </Animated.View>
    </Animated.View>
  );
}
