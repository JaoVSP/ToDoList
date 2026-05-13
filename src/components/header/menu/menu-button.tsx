import { Button } from "@/components/ui/button";
import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { StyleSheet } from "react-native";
import { useMenuModal } from "./hook/use-menu-modal";

export function MenuButton({ isMenuHidden }: { isMenuHidden: boolean }) {
  const { openMenu, closeMenu, modalVisibility } = useMenuModal();

  const menuDisplay = isMenuHidden ? "none" : "flex";
  const menuButtonFunction = modalVisibility != true ? openMenu : closeMenu;
  const isMenuOpen =
    modalVisibility === true ? styles.menuOpen : styles.menuClose;
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
