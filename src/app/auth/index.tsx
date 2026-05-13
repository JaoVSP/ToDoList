import { router, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect } from "react";
import { Colors } from "@/constants/theme";
import { Button } from "@/components/ui/button";
import { getUser } from "@/store/slices/userSessionSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import * as SecureStore from "expo-secure-store";

export default function AuthScreen() {
  const { token, refresh_token } = useLocalSearchParams<{
    token: string;
    refresh_token: string;
  }>();
  const user = useAppSelector((state) => state.userSession);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const login = async () => {
      await SecureStore.setItemAsync("refreshToken", refresh_token);
      await SecureStore.setItemAsync("token", token);
      const provider = await SecureStore.getItemAsync("provider");
      if (user.status === "succeeded" && provider) {
        dispatch(getUser({ jwtToken: token }));
      }
    };

    login();
  }, [user, dispatch]);

  return (
    <View style={styles.container}>
      <Image style={styles.image} src={user.data.avatar_url} />
      <Text style={styles.text}>{user.data.username}</Text>
      <Button
        style={styles.button}
        onPress={() => {
          router.replace("/(app)");
        }}
      >
        <Text style={styles.secondaryText}>Go to the app</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.secondaryBackground,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: Colors.dark.text,
    fontSize: 30,
  },

  secondaryText: {
    color: Colors.dark.dodgerBlue,
    textDecorationLine: "underline",
    fontSize: 35,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
});
