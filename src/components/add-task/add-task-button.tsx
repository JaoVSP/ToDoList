import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Button } from "@/components/ui/button";
import { useTaskModal } from "./hook/use-task-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";

export function AddTaskButton() {
  const { width } = useWindowDimensions();

  const { openModal } = useTaskModal();

  return (
    <View style={[{ width: width * 0.85 }, styles.container]}>
      <Button style={styles.addTaskButton} onPress={openModal}>
        <MaterialCommunityIcons name="plus" size={30} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  addTaskButton: {
    width: 60,
    height: 55,
    backgroundColor: Colors.dark.tomatoRed,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    bottom: 60,
    position: "absolute",
  },
});
