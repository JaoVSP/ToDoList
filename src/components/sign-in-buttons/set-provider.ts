import * as SecureStore from "expo-secure-store";

export async function setProvider(provider: string) {
  await SecureStore.setItemAsync("provider", provider);
}
