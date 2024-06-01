require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { userId } = JSON.parse(event.body);
  console.log("Received userId:", userId);

  try {
    // Check if a customer already exists
    const existingCustomers = await stripe.customers.list({
      limit: 1,
      // Remove the query object
      // filter: { // Use filter if you need to filter by metadata
      //   metadata: { userId },
      // },
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

    // Create a subscription
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

    console.log("Subscription created with ID:", subscription.id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      }),
    };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};