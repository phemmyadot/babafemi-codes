import TechStack from "@/components/TechStack";
import { selectTheme } from "@/store/themeSlice";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Projects from "@/components/Projects";
import Header from "@/components/Banner";
import Head from "next/head";

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}

export default function Home() {
  const themeMode = useSelector(selectTheme);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },{threshold:0.01
    });

    const elements = document.querySelectorAll(".slide-in-section");
    elements.forEach((element) => observer.observe(element));
    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <main>
      <Header />
      <TechStack />
      <Projects />
    </main>
  );
}
