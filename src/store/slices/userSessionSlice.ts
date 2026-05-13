import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as WebBrowser from "expo-web-browser";
import { decode } from "react-native-pure-jwt";
import * as SecureStore from "expo-secure-store";

export interface User {
  id: string;
  username: string;
  avatar_url: string;
}

export interface UserSessionState {
  data: User;
  status: "idle" | "pending" | "succeeded" | "failed";
  isLogged: boolean;
  error: string | null;
}

const initialState: UserSessionState = {
  data: {} as User,
  status: "idle",
  isLogged: false,
  error: null,
};

interface ITokenPayload extends Omit<User, "id"> {
  sub: User["id"];
}

export const signIn = createAsyncThunk(
  "userSession/signin",
  async (provider: string) => {
    const authUrl = process.env.EXPO_PUBLIC_BASE_URL;
    await WebBrowser.openBrowserAsync(`${authUrl}/auth/${provider}/login`);
  },
);

export const getUser = createAsyncThunk(
  "userSession/getuser",
  async ({ jwtToken }: { jwtToken: string }) => {
    const decoded = await decode(jwtToken, "", { skipValidation: true });
    const user = decoded.payload as ITokenPayload;
    return user;
  },
);

export const signOut = createAsyncThunk("userSession/signout", async () => {
  await SecureStore.deleteItemAsync("token");
  await SecureStore.deleteItemAsync("refreshToken");
  await SecureStore.deleteItemAsync("provider");
});

const userSessionSlice = createSlice({
  name: "userSession",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const setPending = (state: UserSessionState) => {
      state.status = "pending";
    };

    const setRejected = (state: UserSessionState, action: any) => {
      state.status = "failed";
      state.error = action.error?.message ?? "Unknown Error";
    };

    builder
      .addCase(signIn.pending, setPending)
      .addCase(signIn.rejected, setRejected)
      .addCase(signIn.fulfilled, (state) => {
        state.status = "succeeded";
      })

      .addCase(getUser.pending, setPending)
      .addCase(getUser.rejected, setRejected)
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLogged = true;
        state.data = {
          id: action.payload.sub,
          username: action.payload.username,
          avatar_url: action.payload.avatar_url,
        };
      })

      .addCase(signOut.pending, setPending)
      .addCase(signOut.rejected, setRejected)
      .addCase(signOut.fulfilled, (state) => {
        state.data = {} as User;
        state.isLogged = false;
        state.status = "idle";
      });
  },
});

export const {} = userSessionSlice.actions;

export default userSessionSlice.reducer;
