import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";
import { GithubAuthButton } from "@/components/sign-in-buttons/github-auth-button";
import { Loading } from "@/components/loading";
import { GoogleAuthButton } from "@/components/sign-in-buttons/google-auth-button";
import { useAppSelector } from "@/store/hooks";
import { UserSessionState } from "@/store/slices/userSessionSlice";

export default function HomeScreen() {
  const userSession: UserSessionState = useAppSelector(
    (state) => state.userSession,
  );

  if (userSession.status === "pending") {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ToDoList</Text>

      <View style={styles.buttonsContainer}>
        <GoogleAuthButton />
        <GithubAuthButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 60,
  },

  buttonsContainer: {
    backgroundColor: Colors.dark.background,
    alignItems: "center",
    gap: 10,
  },
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
    color: "white",
    fontSize: 50,
    marginBottom: 10,
  },
});
