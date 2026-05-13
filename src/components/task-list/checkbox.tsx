import { Button } from "../ui/button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import { useChangeCheckBoxValueMutation } from "@/store/api/apiSlice";

interface CheckboxProps {
  id: string;
  userId: string;
  done: boolean;
  date: string;
}
export function Checkbox({ done, id, date, userId }: CheckboxProps) {
  const checkmark = done ? "checkbox-marked" : "checkbox-blank-outline";

  const [checkTask, { isLoading }] = useChangeCheckBoxValueMutation();

  return (
    <Button
      disabled={isLoading}
      onPress={() => {
        checkTask({ date: date, id: id, userId: userId });
      }}
    >
      <MaterialCommunityIcons
        name={checkmark}
        size={30}
        color={done ? Colors.dark.brightMintGreen : Colors.dark.text}
      />
    </Button>
  );
}
