require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { userId } = JSON.parse(event.body);
  console.log("Received userId:", userId);

  try {
    // Check if customer already exists
    const existingCustomers = await stripe.customers.list({
      limit: 1,
      metadata: { userId },
    });

    let customer;
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      console.log("Existing customer found with ID:", customer.id);
    } else {
      // Create a new customer if none exists
      customer = await stripe.customers.create({
        metadata: { userId },
      });
      console.log("New customer created with ID:", customer.id);
    }

    // Check if the customer already has an active subscription
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length > 0) {
      const existingSubscription = subscriptions.data[0];
      console.log("Existing active subscription found with ID:", existingSubscription.id);

      return {
        statusCode: 200,
        body: JSON.stringify({
          subscriptionId: existingSubscription.id,
          clientSecret: existingSubscription.latest_invoice.payment_intent.client_secret,
        }),
      };
    }

    // Create a new subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: process.env.STRIPE_PRICE_ID }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        userId,
        description: "Subscription creation"
      }
    });

    console.log("New subscription created with ID:", subscription.id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      }),
    };
  } catch (error) {
    console.error("Error creating subscription:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
