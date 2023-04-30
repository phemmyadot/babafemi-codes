import React from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { ThemeMode } from "@/core/enums/Theme.enum";
import Link from "next/link";
import Logo from "./svgs/Logo";
import { selectTheme } from "@/store/themeSlice";
import { useSelector } from "react-redux";

interface NavigationBarProps {}

const NavigationBar: React.FC<NavigationBarProps> = ({}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const themeMode = useSelector(selectTheme);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-full z-10 shadow h-max transition-all duration-500 ease-in-out">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link passHref href="/">
              <Logo themeMode={themeMode} />
            </Link>
          </div>
          <div className="hidden md:block my-auto">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                passHref
                href="/"
                className={`${
                  themeMode === ThemeMode.LIGHT
                    ? "text-black"
                    : "text-white"
                } px-3 py-2 rounded-md text-sm font-medium`}>
                Home
              </Link>
              <Link
                passHref
                href="/about"
                className={`${
                  themeMode === ThemeMode.LIGHT
                    ? "text-black"
                    : "text-white"
                } px-3 py-2 rounded-md text-sm font-medium`}>
                About
              </Link>
              <Link
                passHref
                href="/tech-stack"
                className={`${
                  themeMode === ThemeMode.LIGHT
                    ? "text-black"
                    : "text-white"
                } px-3 py-2 rounded-md text-sm font-medium`}>
                Tech Stack
              </Link>
              <Link
                passHref
                href="/projects"
                className={`${
                  themeMode === ThemeMode.LIGHT
                    ? "text-black"
                    : "text-white"
                } px-3 py-2 rounded-md text-sm font-medium`}>
                Projects
              </Link>
              <Link
                passHref
                href="/contact"
                className={`${
                  themeMode === ThemeMode.LIGHT
                    ? "text-black"
                    : "text-white"
                } px-3 py-2 rounded-md text-sm font-medium`}>
                Contact
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden items-center">
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                themeMode === ThemeMode.LIGHT
                  ? "text-black bg-white"
                  : "text-white bg-black"
              } hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-500 ease-in-out`}
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={handleToggleMenu}>
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 grid">
          <Link
            passHref
            href="#header"
            className={`${
              themeMode === ThemeMode.LIGHT
                ? "text-black"
                : "text-white"
            } px-3 py-2 rounded-md text-sm font-medium`}>
            Home
          </Link>
          <Link
            passHref
            href="/about"
            className={`${
              themeMode === ThemeMode.LIGHT
                ? "text-black"
                : "text-white"
            } px-3 py-2 rounded-md text-sm font-medium`}>
            About
          </Link>
          <Link
            passHref
            href="/tech-stack"
            className={`${
              themeMode === ThemeMode.LIGHT
                ? "text-black"
                : "text-white"
            } px-3 py-2 rounded-md text-sm font-medium`}>
            Tech Stack
          </Link>
          <Link
            passHref
            href="/projects"
            className={`${
              themeMode === ThemeMode.LIGHT
                ? "text-black"
                : "text-white"
            } px-3 py-2 rounded-md text-sm font-medium`}>
            Projects
          </Link>
          <Link
            passHref
            href="/contact"
            className={`${
              themeMode === ThemeMode.LIGHT
                ? "text-black"
                : "text-white"
            } px-3 py-2 rounded-md text-sm font-medium`}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
