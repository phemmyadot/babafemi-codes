import { ThemeMode } from "@/core/enums/Theme.enum";
import { TbBulbOff,TbBulb } from "react-icons/tb";

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
    onToggle(newThemeMode);
  };

  return (
    <button onClick={handleClick} className="theme-fab">
      {themeMode == ThemeMode.LIGHT ? (
        <TbBulbOff color="#ffffff" size={22}/>
      ) : (
        <TbBulb color="#1f1f1f"  size={24}/>
      )}
    </button>
  );
};

export default ThemeToggle;
