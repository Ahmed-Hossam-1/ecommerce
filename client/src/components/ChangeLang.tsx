import { useTranslation } from 'react-i18next';

const ChangeLang = () => {
  const { i18n } = useTranslation();

  return (
    <div>
      {i18n.language === 'ar' ? (
        <span
          className="new-lang cursor-pointer dark:text-[var(--white-color)] text-[var(--main-dark)]"
          onClick={() => {
            i18n.changeLanguage('en');
          }}
        >
          English
        </span>
      ) : (
        <span
          className="new-lang cursor-pointer dark:text-[var(--white-color)] text-[var(--main-dark)]"
          onClick={() => {
            i18n.changeLanguage('ar');
          }}
        >
          العربيه
        </span>
      )}
    </div>
  );
};

export default ChangeLang;
