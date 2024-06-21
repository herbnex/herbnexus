import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const handlePopState = () => {
      const savedPosition = sessionStorage.getItem('scrollPosition');
      if (savedPosition !== null) {
        window.scrollTo(0, parseInt(savedPosition, 10));
      }
    };

    const saveScrollPosition = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY);
    };

    // Scroll to top on new page load
    window.scrollTo(0, 0);

    // Save scroll position before navigating away
    window.addEventListener('beforeunload', saveScrollPosition);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location.pathname]);
};

export default useScrollHandler;
