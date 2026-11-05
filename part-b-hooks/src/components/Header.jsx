import useClock from "../hooks/useClock";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const currentTime = useClock();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <h1>Sổ chi tiêu cá nhân</h1>
      <p className="clock">Thời gian hiện tại: {currentTime}</p>
      <button type="button" className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "Chế độ không sáng" : "Chế độ không tối"}
      </button>
    </header>
  );
}

export default Header;
