import { StyleSheet, Text } from "react-native";

import { Button } from "../ui/button";

import { Colors } from "@/constants/theme";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { signIn } from "@/store/slices/userSessionSlice";
import { useAppDispatch } from "@/store/hooks";
import { setProvider } from "./set-provider";

export function GithubAuthButton() {
  const dispatch = useAppDispatch();

  return (
    <Button
      style={[{ backgroundColor: Colors.dark.lightCharcoal }, styles.button]}
      onPress={() => {
        setProvider("github");
        dispatch(signIn("github"));
      }}
    >
      <MaterialCommunityIcons
        name="github"
        size={26}
        color={Colors.dark.text}
      />
      <Text style={styles.text}>Sign in with Github</Text>
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
