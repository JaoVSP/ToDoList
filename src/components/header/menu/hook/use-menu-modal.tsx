import { useContext, useRef } from "react";
import { createContext, useState } from "react";
import { Animated } from "react-native";

interface IModal {
  modalVisibility: boolean;
  translateY: Animated.Value;
  openMenu: () => void;
  closeMenu: () => void;
}

export const ModalContext = createContext<IModal>({} as IModal);

export function MenuModalProvider({ children }: { children: React.ReactNode }) {
  const [modalVisibility, setModalVisibility] = useState(false);

  const translateY = useRef(new Animated.Value(0)).current;

  const openMenu = () => {
    setModalVisibility(true);
    Animated.spring(translateY, {
      toValue: 80,
      damping: 18,
      stiffness: 90,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.spring(translateY, {
      toValue: -90,
      damping: 18,
      stiffness: 90,
      overshootClamping: true,
      useNativeDriver: true,
    }).start(() => {
      setModalVisibility(false);
    });
  };

  return (
    <ModalContext value={{ modalVisibility, translateY, openMenu, closeMenu }}>
      {children}
    </ModalContext>
  );
}

export function useMenuModal() {
  return useContext(ModalContext);
}
