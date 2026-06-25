import { Button } from "@/components/ui/button";
import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { StyleSheet } from "react-native";
import { useModal } from "../../hooks/useModal";
import { Animated } from "react-native";

export function MenuButton({ isMenuHidden }: { isMenuHidden: boolean }) {
  const { modalType, animation, setModalType } = useModal();

  const openMenu = () => {
    setModalType("menu");
    Animated.spring(animation, {
      toValue: 80,
      damping: 18,
      stiffness: 90,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.spring(animation, {
      toValue: -90,
      damping: 18,
      stiffness: 90,
      overshootClamping: true,
      useNativeDriver: true,
    }).start(() => {
      setModalType(null);
    });
  };

  const menuDisplay = isMenuHidden ? "none" : "flex";
  const menuButtonFunction = modalType ? closeMenu : openMenu;
  const isMenuOpen = modalType == "menu" ? styles.menuOpen : styles.menuClose;
  return (
    <Button
      style={[{ display: menuDisplay }, styles.button, isMenuOpen]}
      onPress={menuButtonFunction}
    >
      <MaterialCommunityIcons
        name="menu"
        size={40}
        color={Colors.dark.secondaryText}
      />
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 120,
  },
  menuOpen: {
    outlineColor: Colors.dark.dodgerBlue,
    outlineWidth: 1,
    outlineOffset: 3,
    borderRadius: 10,
  },
  menuClose: {
    outline: "none",
  },
});
