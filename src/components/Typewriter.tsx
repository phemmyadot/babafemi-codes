import { ThemeMode } from "@/core/enums/Theme.enum";
import { IntroDTO, Intro } from "@/core/models/intro";
import { selectTheme } from "@/store/themeSlice";
import axios from "axios";
import { Itim } from "next/font/google";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface TypewriterProps {}

const itim = Itim({ weight: ["400"], subsets: ["latin"] });
const Typewriter: React.FC<TypewriterProps> = () => {
  const [displayText, setDisplayText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(true);

  const themeMode = useSelector(selectTheme);

  useEffect(() => {
    if (!isTyping) return;
    const texts = [
      "I AM BABAFEMI",
      "FULL STACK SOFTWARE DEVELOPER",
      "BUILDING DIGITAL SOLUTIONS",
      "TRANSFORMING IDEAS INTO REALITY",
      "INNOVATING WITH CODE AND DESIGN",
    ];
    const currentString =
      texts.length == 0 ? "" : texts[currentIndex];
    const isDisplayed = displayText === currentString;

    if (!isDisplayed) {
      const timeoutId = setTimeout(() => {
        setDisplayText(
          currentString.slice(0, displayText.length + 1)
        );
      }, 200);
      return () => clearTimeout(timeoutId);
    } else {
      const timeoutId = setTimeout(() => {
        setCurrentIndex((currentIndex + 1) % texts.length);
        setDisplayText("");
        setIsTyping(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [displayText, currentIndex, isTyping]);
  return (
    <span
      className={`${
        itim.className
      } flex justify-center md:justify-start m-auto text-3xl md:text-[38px] text-center font-semibold capitalize ${
        themeMode === ThemeMode.LIGHT
          ? "text-[#42446E]"
          : "text-[#D9D9D9]"
      }`}>
      {displayText}
    </span>
  );
};
export default Typewriter;
