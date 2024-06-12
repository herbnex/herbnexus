import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      localStorage.setItem('scrollPosition', window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    const savedPosition = localStorage.getItem('scrollPosition');

    if (!sessionStorage.getItem('visitedBefore')) {
      window.scrollTo(0, 0);
      sessionStorage.setItem('visitedBefore', 'true');
    } else if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);
};

export default useScrollToTop;
