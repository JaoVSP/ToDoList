import React, { useRef } from "react";
import { createContext, useState } from "react";

import { Animated } from "react-native";

interface IModal {
  modalType: "addTask" | "menu" | null;
  setModalType: React.Dispatch<React.SetStateAction<modalType>>;
  animation: Animated.Value;
}

type modalType = "addTask" | "menu" | null;

export const ModalContext = createContext<IModal>({} as IModal);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalType, setModalType] = useState<modalType>(null);
  const animation = useRef(new Animated.Value(0)).current;

  return (
    <ModalContext value={{ modalType, animation, setModalType }}>
      {children}
    </ModalContext>
  );
}
