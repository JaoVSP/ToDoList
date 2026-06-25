import { View, StyleSheet, Text, Animated, Keyboard } from "react-native";
import { Button } from "../../ui/button";
import { Colors } from "@/constants/theme";
import { useModal } from "../../hooks/useModal";
import { useLocalSearchParams } from "expo-router";
import { useAddNewTaskMutation } from "@/store/api/apiSlice";
import { useAppSelector } from "@/store/hooks";

interface AddTaskModalButtonsProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export function AddTaskModalButtons({
  text,
  setText,
  setError,
}: AddTaskModalButtonsProps) {
  const { date } = useLocalSearchParams<{ date: string }>();
  const [addNewTask, { isLoading }] = useAddNewTaskMutation();
  const user = useAppSelector((state) => state.userSession);

  const { animation, setModalType } = useModal();

  const closeModalAndClearText = () => {
    setText("");

    Keyboard.dismiss();
    Animated.timing(animation, {
      toValue: 0,
      duration: 100,
      delay: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalType(null);
    });

    setError("");
  };

  const handleSubmit = () => {
    if (text.length < 2) {
      return setError("Enter at least 2 characters.");
    }

    addNewTask({ userId: user.data.id, text: text, date: date });
    closeModalAndClearText();
  };

  return (
    <View style={styles.addModalViewButtons}>
      <Button
        disabled={isLoading}
        style={styles.addModalButton}
        onPress={handleSubmit}
      >
        <Text style={styles.textButton}>add</Text>
      </Button>
      <Button style={styles.cancelModalButton} onPress={closeModalAndClearText}>
        <Text style={styles.cancelText}>cancel</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  addModalButton: {
    borderRadius: 25,
    height: 50,
    width: 95,
    backgroundColor: Colors.dark.darkShadow,
    justifyContent: "center",
    alignItems: "center",
  },

  cancelModalButton: {
    borderRadius: 25,
    height: 50,
    width: 95,
    backgroundColor: Colors.dark.darkShadow,
    justifyContent: "center",
    alignItems: "center",
  },

  addModalViewButtons: {
    flexDirection: "row",
    gap: 30,
    marginTop: 35,
  },

  cancelText: {
    color: Colors.dark.orangeRed,
    fontSize: 18,
  },

  textButton: {
    color: Colors.dark.text,
    fontSize: 18,
  },
});
