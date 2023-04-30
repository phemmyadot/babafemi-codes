import { ThemeMode } from "@/core/enums/Theme.enum";

export interface ThemeState {
  theme: ThemeMode;
}

export interface RootState {
  theme: ThemeState;
}
