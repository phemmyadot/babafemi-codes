import { ThemeMode } from "@/enums/Theme.enum";
import { FaMoon, FaSun, FaTwitter } from "react-icons/fa";

interface ThemeToggleProps {
  themeMode: ThemeMode;
  onToggle: (themeMode: ThemeMode) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  themeMode,
  onToggle,
}) => {
  const handleClick = () => {
    const newThemeMode =
      themeMode === ThemeMode.LIGHT
        ? ThemeMode.DARK
        : ThemeMode.LIGHT;
        console.log(newThemeMode, themeMode,'iiiiiiiii')
    onToggle(newThemeMode);
  };

  return (
    <button onClick={handleClick} className="theme-fab">
      {themeMode == ThemeMode.LIGHT ? (
        <FaMoon color="#ffffff" size={24}/>
      ) : (
        <FaSun color="#1f1f1f"  size={24}/>
      )}
    </button>
  );
};

export default ThemeToggle;
