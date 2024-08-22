import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      console.log(currentLang);
      mainRef.current.dir = currentLang === 'en' ? 'ltr' : 'rtl';
    }
  }, [currentLang]);
  return (
    <main ref={mainRef}>
      <Outlet />
    </main>
  );
};

export default Layout;
