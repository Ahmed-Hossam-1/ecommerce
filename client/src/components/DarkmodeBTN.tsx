import { useDarkMode } from '../context/DarkMode';
import './DarkMode.css';
const DarkmodeBTN = () => {
  const { theme, toggleTheme } = useDarkMode();
  return (
    // <div>
    //   <button onClick={toggleTheme}>{theme === 'dark' ? 'Light' : 'Dark'} Mode</button>
    // </div>

    <div className="dark_mode">
      <input
        onClick={toggleTheme}
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        checked={theme === 'dark'}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <img src="/images/Sun.svg" className="sun w-[100px]" alt="Sun" />
        <img src="/images/Moon.svg" className="moon w-[100px]" alt="Moon" />
      </label>
    </div>
  );
};

export default DarkmodeBTN;
