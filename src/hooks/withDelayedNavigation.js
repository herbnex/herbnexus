import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Loading from '../components/Loading/Loading'; // Adjust the path if necessary

const withDelayedNavigation = (Component, delay = 2000) => {
  return (props) => {
    const history = useHistory();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, delay);

      return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
      if (!loading) {
        history.push(location.pathname);
      }
    }, [loading, history, location.pathname]);

    if (loading) {
      return <Loading />;
    }

    return <Component {...props} />;
  };
};

export default withDelayedNavigation;
