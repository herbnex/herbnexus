import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollPosition = () => {
  const location = useLocation();

  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY);
    };

    const restoreScrollPosition = () => {
      const savedPosition = sessionStorage.getItem('scrollPosition');
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition, 10));
      }
    };

    window.addEventListener('beforeunload', saveScrollPosition);
    window.addEventListener('popstate', restoreScrollPosition);
    window.addEventListener('load', restoreScrollPosition);

    restoreScrollPosition(); // Restore position on component mount

    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
      window.removeEventListener('popstate', restoreScrollPosition);
      window.removeEventListener('load', restoreScrollPosition);
    };
  }, [location.pathname]);
};

export default useScrollPosition;
