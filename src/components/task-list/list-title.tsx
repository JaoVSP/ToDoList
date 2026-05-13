import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export function ListTitle() {
  const { date } = useLocalSearchParams<{ date: string }>();

  return (
    <View>
      <Text style={{ color: "white", fontSize: 25 }}>ToDo - {date}</Text>
    </View>
  );
}
