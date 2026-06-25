import { useState } from "react";
import { StyleSheet, Text, useWindowDimensions } from "react-native";

import { Colors } from "@/constants/theme";

import { Modal } from "../../ui/modal";

import { AddTaskModalButtons } from "./add-task-modal-buttons";
import { AddTaskModalInput } from "./add-task-modal-input";
import { useModal } from "../../hooks/useModal";

export function AddTaskModal() {
  const [text, setText] = useState("");
  const { modalType, animation } = useModal();
  const [error, setError] = useState("");

  const { width, height } = useWindowDimensions();

  const isOpen = modalType == "addTask";

  return (
    <Modal
      visible={isOpen}
      childViewStyle={[
        { width: width * 0.85, height: height * 0.35 },
        styles.childView,
      ]}
      parentViewStyle={[
        styles.parentView,
        { height: 2 * height, width: 2 * width },
      ]}
      animation={{ opacity: animation }}
    >
      <Text style={styles.text}>Enter the task:</Text>
      <AddTaskModalInput setText={setText} text={text} />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <AddTaskModalButtons setText={setText} text={text} setError={setError} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.dark.text,
    fontSize: 26,
  },
  childView: {
    backgroundColor: Colors.dark.secondaryBackground,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  parentView: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.softShadow,
  },
  error: {
    fontSize: 18,
    marginTop: 16,
    color: Colors.dark.tomatoRed,
  },
});
