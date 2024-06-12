import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (!sessionStorage.getItem('visitedBefore')) {
      window.scrollTo(0, 0);
      sessionStorage.setItem('visitedBefore', 'true');
    } else if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

export default useScrollToTop;
