import { Button } from "@/components/ui/button";
import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, StyleSheet } from "react-native";
import { useAppDispatch } from "@/store/hooks";
import { signOut } from "@/store/slices/userSessionSlice";

export function SignOut() {
  const dispatch = useAppDispatch();

  return (
    <Button
      style={styles.container}
      onPress={() => {
        dispatch(signOut());
      }}
    >
      <MaterialCommunityIcons
        name="logout"
        size={25}
        color={Colors.dark.tomatoRed}
      />
      <Text style={styles.text}>Sign out</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  text: {
    color: Colors.dark.tomatoRed,
    fontSize: 22,
  },
});
