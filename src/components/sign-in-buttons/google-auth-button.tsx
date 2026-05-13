import { Button } from "../ui/button";
import { StyleSheet, Text } from "react-native";

import { Colors } from "@/constants/theme";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch } from "@/store/hooks";
import { signIn } from "@/store/slices/userSessionSlice";
import { setProvider } from "./set-provider";

export function GoogleAuthButton() {
  const dispatch = useAppDispatch();

  return (
    <Button
      style={[{ backgroundColor: Colors.dark.tomatoRed }, styles.button]}
      onPress={() => {
        setProvider("google");
        dispatch(signIn("google"));
      }}
    >
      <MaterialCommunityIcons
        name="google"
        size={26}
        color={Colors.dark.text}
      />
      <Text style={styles.text}>Sign in with Google</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 240,
    height: 50,
    borderRadius: 26,
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: Colors.dark.text,
    fontSize: 20,
  },
});
