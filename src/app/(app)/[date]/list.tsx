import { AddTaskButton } from "@/components/add-task/add-task-button";
import { TaskModalProvider } from "@/components/add-task/hook/use-task-modal";
import { AddTaskModal } from "@/components/add-task/modal/add-task-modal";
import { TasksList } from "@/components/task-list/tasks-list";
import { ListTitle } from "@/components/task-list/list-title";
import { Colors } from "@/constants/theme";

import { View, StyleSheet } from "react-native";
import { Header } from "@/components/header/header";

export default function List() {
  return (
    <View style={styles.container}>
      <TaskModalProvider>
        <Header isMenuHidden={true}>
          <ListTitle />
        </Header>
        <TasksList />
        <AddTaskButton />
        <AddTaskModal />
      </TaskModalProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: Colors.dark.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
