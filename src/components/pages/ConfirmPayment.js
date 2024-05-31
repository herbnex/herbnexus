import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../src/hooks/useAuth';

const ConfirmPayment = () => {
  const { updateUser } = useAuth();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const updateSubscriptionStatus = async () => {
      const userId = new URLSearchParams(location.search).get('user_id');
      if (userId) {
        await updateUser(userId);
        history.push('/contact');
      } else {
        history.push('/subscription');
      }
    };

    updateSubscriptionStatus();
  }, [location, history, updateUser]);

  return <div>Processing your subscription...</div>;
};

export default ConfirmPayment;
