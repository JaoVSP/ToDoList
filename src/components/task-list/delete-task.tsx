import { Button } from "../ui/button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";

import { useDeleteTaskMutation } from "@/store/api/apiSlice";

interface IDeleteTask {
  id: string;
  userId: string;
  date: string;
}

export function DeleteTask({ id, date, userId }: IDeleteTask) {
  const [useDeleteTask] = useDeleteTaskMutation();

  return (
    <Button onPress={() => useDeleteTask({ id: id, date: date, userId })}>
      <MaterialCommunityIcons
        name="trash-can"
        size={25}
        color={Colors.dark.orangeRed}
      />
    </Button>
  );
}
