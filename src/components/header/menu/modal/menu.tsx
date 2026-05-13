import { Modal } from "@/components/ui/modal";

import { StyleSheet, useWindowDimensions } from "react-native";

import { Colors } from "@/constants/theme";
import { useMenuModal } from "../hook/use-menu-modal";
import { Profile } from "./profile";
import { SignOut } from "./sign-out-button";

export function Menu() {
  const { modalVisibility, translateY } = useMenuModal();
  const { width, height } = useWindowDimensions();
  return (
    <Modal
      visible={modalVisibility}
      childViewStyle={[
        { width: width * 0.9, height: height * 0.2 },
        styles.childView,
      ]}
      parentViewStyle={[
        styles.parentView,
        { height: 2 * height, width: 2 * width },
      ]}
      animation={{ transform: [{ translateY: translateY }] }}
    >
      <Profile />
      <SignOut />
    </Modal>
  );
}

const styles = StyleSheet.create({
  parentView: {
    position: "absolute",
    alignItems: "center",
    backgroundColor: Colors.dark.softShadow,
    zIndex: 1,
  },

  childView: {
    backgroundColor: Colors.dark.secondaryBackground,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: Colors.dark.lightCharcoal,
    borderWidth: 1,
    gap: 6,
  },
});
