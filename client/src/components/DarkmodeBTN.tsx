import { useDarkMode } from '../context/DarkMode';

const DarkmodeBTN = () => {
  const { theme, toggleTheme } = useDarkMode();
  return (
    <div>
      <input
        onClick={toggleTheme}
        className="hidden"
        type="checkbox"
        id="darkmode-toggle"
        checked={theme === 'dark'}
      />
      <label htmlFor="darkmode-toggle">
        {theme === 'dark' ? (
          <div className="w-[32px] h-[32px] flex justify-center items-center rounded-full bg-[#d8860bbd] cursor-pointer">
            <img src="/images/Sun.svg" className="w-[20px]" alt="Sun" />
          </div>
        ) : (
          <div className="w-[32px] h-[32px] flex justify-center items-center rounded-full bg-[#3a3a3a8f] cursor-pointer">
            <img src="/images/Moon.svg" className="w-[20px]" alt="Moon" />
          </div>
        )}
      </label>
    </div>
  );
};

export default DarkmodeBTN;
