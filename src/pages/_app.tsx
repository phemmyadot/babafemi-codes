import "@/styles/globals.scss";
import { ThemeState } from "@/store/types";
import store, { persistor } from "@/store/index";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import NavigationBar from "@/components/NavBar";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeMode } from "@/enums/Theme.enum";
// import { setTheme } from "@/store/themeSlice";
import { useEffect } from "react";
import { selectTheme, setTheme } from "@/store/themeSlice";
import { PersistGate } from "redux-persist/integration/react";

// Define the AppProps interface
interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}

function App({ Component, pageProps }: AppProps) {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  // Load the theme from localStorage if it exists
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      dispatch(setTheme(savedTheme as ThemeMode));
    } else {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        dispatch(setTheme(ThemeMode.DARK));
      } else {
        dispatch(setTheme(ThemeMode.LIGHT));
      }
    }
  }, [dispatch]);

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
    <>
      <NavigationBar themeMode={theme} />
      <Component {...pageProps} />

      <ThemeToggle
        themeMode={theme}
        onToggle={toggleTheme}></ThemeToggle>
    </>
  );
}
export default function Layout({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App Component={Component} pageProps={pageProps} />
        </PersistGate>
    </Provider>
  );
}
