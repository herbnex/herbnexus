import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from '../components/Loading/Loading'; // Adjust the path if necessary

const withDelayedNavigation = (Component, delay = 2000) => {
  return (props) => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, delay);

      return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
      if (!loading) {
        history.push(props.location.pathname);
      }
    }, [loading, history, props.location.pathname]);

    if (loading) {
      return <Loading />;
    }

    return <Component {...props} />;
  };
};

export default withDelayedNavigation;
