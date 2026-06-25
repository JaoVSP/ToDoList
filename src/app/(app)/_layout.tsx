import { ModalProvider } from "@/components/contexts/ModalContext";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <ModalProvider>
      <Stack
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      />
    </ModalProvider>
  );
}
