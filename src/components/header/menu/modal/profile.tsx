import { useAppSelector } from "@/store/hooks";
import { View, Text, Image, StyleSheet } from "react-native";

export function Profile() {
  const user = useAppSelector((state) => state.userSession);

  return (
    <View style={styles.container}>
      <Image style={styles.image} src={user.data.avatar_url} />
      <Text style={styles.text}> {user.data.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontSize: 18,
  },

  image: {
    width: 42,
    height: 42,
    borderRadius: 30,
  },
});
