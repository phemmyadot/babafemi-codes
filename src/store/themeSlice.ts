import { ThemeMode } from "@/core/enums/Theme.enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { ThemeState } from "./types";

const initialState: ThemeState = {
  theme: ThemeMode.LIGHT,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state: ThemeState, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state: RootState): ThemeMode => state.theme.theme;

export default themeSlice.reducer;
