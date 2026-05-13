import {
  FlatList,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Checkbox } from "./checkbox";
import { DeleteTask } from "./delete-task";
import { useLocalSearchParams } from "expo-router";

import { useGetTasksQuery, Task } from "@/store/api/apiSlice";
import { Loading } from "../loading";
import { useAppSelector } from "@/store/hooks";

const useGetTasks = (date: string, userId: string) => {
  const {
    data: tasks = [],
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetTasksQuery({ date, userId });
  return { tasks, isSuccess, isLoading, isError, error };
};

export function TasksList() {
  const { width } = useWindowDimensions();
  const user = useAppSelector((state) => state.userSession);
  const { date } = useLocalSearchParams<{ date: string }>();

  const getTasks = useGetTasks(date, user.data.id);

  const Tasks = ({ text, id, done }: Task) => {
    if (getTasks.isLoading) {
      return <Loading />;
    } else if (getTasks.isError) {
      if (getTasks.error) {
        return <Text>{getTasks.error.toString()}</Text>;
      }
    } else if (getTasks.isSuccess) {
      return (
        <View style={styles.task}>
          <Checkbox done={done} date={date} id={id} userId={user.data.id} />
          <Text
            style={[
              { width: width * 0.6 },
              done ? styles.taskTextDone : styles.taskText,
            ]}
          >
            {text}
          </Text>
          <DeleteTask id={id} date={date} userId={user.data.id} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={getTasks.tasks}
        style={styles.flatList}
        renderItem={({ item }) => (
          <Tasks
            task_date={item.task_date}
            text={item.text}
            userId={item.userId}
            id={item.id}
            done={item.done}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 130,
  },

  flatList: {
    marginTop: 10,
  },

  task: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    gap: 8,
  },
  taskText: {
    color: "#fff",
    fontSize: 20,
  },
  taskTextDone: {
    color: "rgba(255, 255, 255, 0.7)",
    textDecorationLine: "line-through",
    fontSize: 20,
  },
});
