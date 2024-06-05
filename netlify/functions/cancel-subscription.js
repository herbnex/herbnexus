require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { userId } = JSON.parse(event.body);
  try {
    const customer = await stripe.customers.list({
      limit: 1,
      metadata: { userId }
    });

    if (customer.data.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Customer not found' }),
      };
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customer.data[0].id,
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Subscription not found' }),
      };
    }

    const subscription = await stripe.subscriptions.del(subscriptions.data[0].id);

    return {
      statusCode: 200,
      body: JSON.stringify({ subscription }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
