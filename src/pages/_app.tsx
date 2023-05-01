import "@/styles/globals.scss";
import store, { persistor } from "@/store/index";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import NavigationBar from "@/components/NavBar";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeMode } from "@/core/enums/Theme.enum";
import { useEffect } from "react";
import { selectTheme, setTheme } from "@/store/themeSlice";
import { PersistGate } from "redux-persist/integration/react";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";
import Head from "next/head";

// Define the AppProps interface
interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

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
    console.log("here");
    const html = document.querySelector("html");
    if (html) {
      html.dataset.theme = theme;
    }
  }, [theme]);

  const toggleTheme = (theme: ThemeMode) => dispatch(setTheme(theme));

  return (
    <>
      <NavigationBar />
      <div
        className={`${poppins.className} py-20 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8`}>
        <Component {...pageProps} />
      </div>
      <Footer />
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
        <Head>
          <title>Babafemi codes</title>
        </Head>
        <App Component={Component} pageProps={pageProps} />
      </PersistGate>
    </Provider>
  );
}
