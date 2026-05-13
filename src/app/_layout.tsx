import { store } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { getUser } from "@/store/slices/userSessionSlice";
import { useEffect } from "react";
import { injectStore } from "@/api/auth-api";

export default function Root() {
  injectStore(store);
  return (
    <Provider store={store}>
      <StatusBar hidden={true} />
      <RootNavigator />
    </Provider>
  );
}

function RootNavigator() {
  const user = useAppSelector((state) => state.userSession);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const jwt = await SecureStore.getItemAsync("token");

        if (jwt != null) {
          dispatch(getUser({ jwtToken: jwt }));
        }
      } catch (error) {
        console.error("Startup Error: ", error);
      }
    };
    bootstrapAuth();
  }, [dispatch]);

  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Protected guard={user.isLogged === true}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={user.isLogged === false}>
        <Stack.Screen name="sign-in" />
      </Stack.Protected>
    </Stack>
  );
}
