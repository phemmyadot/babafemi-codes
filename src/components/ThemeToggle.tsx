import { ThemeMode } from "@/enums/Theme.enum";

interface ThemeToggleProps {
    themeMode: ThemeMode;
    onToggle: (themeMode: ThemeMode) => void;
  }
  
  const ThemeToggle: React.FC<ThemeToggleProps> = ({ themeMode, onToggle }) => {
    const handleClick = () => {
      const newThemeMode =
        themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
      onToggle(newThemeMode);
    };
  
    return (
      <button onClick={handleClick}>
        {themeMode === ThemeMode.LIGHT ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </button>
    );
  };

  export default ThemeToggle;
  