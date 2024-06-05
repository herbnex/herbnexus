import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const ManageSubscription = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await axios.post('/.netlify/functions/get-subscription', { userId: user.uid });
        const { subscription } = response.data;
        setIsSubscribed(subscription.isSubscribed);
        setSubscriptionEndDate(subscription.subscriptionEndDate);
      } catch (error) {
        setError('Failed to fetch subscription status. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchSubscriptionStatus();
    }
  }, [user]);

  const handleCancelSubscription = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await axios.post('/.netlify/functions/cancel-subscription', { userId: user.uid });
      if (response.status === 200) {
        updateUser({ ...user, isSubscribed: false });
        setIsSubscribed(false);
        setSubscriptionEndDate(null);
      } else {
        setError('Failed to cancel subscription. Please try again.');
      }
    } catch (error) {
      setError('Failed to cancel subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Card>
      <Card.Header>Manage Subscription</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {isSubscribed ? (
          <>
            <Card.Text>
              You are subscribed to the Herb Nexus plan. Your subscription will renew on {new Date(subscriptionEndDate).toLocaleDateString()}.
            </Card.Text>
            <Button variant="danger" onClick={handleCancelSubscription}>
              Cancel Subscription
            </Button>
          </>
        ) : (
          <Card.Text>
            You are not currently subscribed to any plan.
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default ManageSubscription;
