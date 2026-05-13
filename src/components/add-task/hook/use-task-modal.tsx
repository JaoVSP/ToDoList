import React, { useContext, useRef } from "react";
import { createContext, useState } from "react";
import { Keyboard } from "react-native";
import { Animated, Easing } from "react-native";

interface IModal {
  modalVisibility: boolean;
  fadeAnimation: Animated.Value;
  openModal: () => void;
  closeModal: () => void;
}

export const ModalContext = createContext<IModal>({} as IModal);

export function TaskModalProvider({ children }: { children: React.ReactNode }) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const openModal = () => {
    setModalVisibility(true);
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 100,
      easing: Easing.sin,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Keyboard.dismiss();
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 100,
      delay: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalVisibility(false);
    });
  };

  return (
    <ModalContext
      value={{ modalVisibility, fadeAnimation, openModal, closeModal }}
    >
      {children}
    </ModalContext>
  );
}

export function useTaskModal() {
  return useContext(ModalContext);
}
