import { useTranslation } from 'react-i18next';
import DarkmodeBTN from '../../components/DarkmodeBTN';

const Home = () => {
  const { i18n } = useTranslation();
  return (
    <div className=" text-black bg-white dark:bg-black dark:text-white">
      <h1 className="dark:text-[var(--white-color)] text-[var(--main-dark)]">Home</h1>
      {i18n.language === 'ar' ? (
        <span
          className="new-lang dark:text-[var(--white-color)] text-[var(--main-dark)]"
          onClick={() => {
            i18n.changeLanguage('en');
          }}
        >
          English
        </span>
      ) : (
        <span
          className="new-lang dark:text-[var(--white-color)] text-[var(--main-dark)]"
          onClick={() => {
            i18n.changeLanguage('ar');
          }}
        >
          العربيه
        </span>
      )}
      <DarkmodeBTN />
    </div>
  );
};

export default Home;
