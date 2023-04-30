import Header from "@/components/header";
import { selectTheme } from "@/store/themeSlice";
import React from "react";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}

export default function Home() {
  const themeMode = useSelector(selectTheme);

  useEffect(() => {
    console.log("here");
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // entry.target.classList.add("");
          // entry.target.classList.add("");
          // entry.target.classList.add("");
          // entry.target.classList.add("");
          // entry.target.classList.add("");
        } else {
          entry.target.classList.remove("active");
          // entry.target.classList.remove("transition");
          // entry.target.classList.remove("translate-x-[-100%]");
          // entry.target.classList.remove("md:translate-x-0");
          // entry.target.classList.remove("ease-in-out");
          // entry.target.classList.remove("duration-500");
        }
      });
    },{
      threshold: 0.05
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
      <AnimatedSection className="slide-in-section transform transition translate-x-[-100%] md:translate-x-0 ease-in-out duration-500" />
      <AnimatedSection className="slide-in-section" />
      <AnimatedSection className="slide-in-section" />
      <AnimatedSection className="slide-in-section" />
      <AnimatedSection className="slide-in-section" />
    </main>
  );
}
interface props {
  className: string;
}

const AnimatedSection: React.FC<props> = ({ className }) => {
  return (
    <section className={`${className} py-[200px]`}>
      <p>gahgsahjgkajs</p>
      <p>hjsagjhgsa</p>
      <p>hjsagjhgsa</p>
      <p>hjsagjhgsa</p>
    </section>
  );
};
