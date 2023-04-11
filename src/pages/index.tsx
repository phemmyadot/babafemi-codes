import { Inter } from "next/font/google";
import { ThemeMode } from "./../enums/Theme.enum";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { RootState } from "@/store/types";
import { setTheme } from "@/store/themeSlice";
import { useDispatch, useSelector } from "react-redux";

// Define the AppProps interface
interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  // Load the theme from localStorage if it exists
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme as ThemeMode);
    } else {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setTheme(ThemeMode.DARK);
      } else {
        setTheme(ThemeMode.LIGHT);
      }
    }
  }, []);

  // Save the theme to localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Apply the current theme to the HTML document
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.dataset.theme = theme;
    }
  }, [theme]);
  
  const toggleTheme = (theme: ThemeMode) => dispatch(setTheme(theme));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <ThemeToggle
        themeMode={theme}
        onToggle={toggleTheme}></ThemeToggle>
    </main>
  );
}
