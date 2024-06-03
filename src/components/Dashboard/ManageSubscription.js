import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const ManageSubscription = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await axios.post('/.netlify/functions/get-subscription', { userId: user.uid });
        setSubscription(response.data.subscription);
      } catch (error) {
        setError('Failed to fetch subscription details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchSubscription();
    }
  }, [user]);

  const handleCancelSubscription = async () => {
    setLoading(true);
    try {
      await axios.post('/.netlify/functions/cancel-subscription', { userId: user.uid });
      updateUser({ ...user, isSubscribed: false });
      setSubscription(null);
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
        {subscription ? (
          <>
            <Card.Text>
              You are subscribed to the Herb Nexus plan. Your subscription will renew on {new Date(subscription.current_period_end * 1000).toLocaleDateString()}.
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
