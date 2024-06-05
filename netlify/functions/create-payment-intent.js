require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { userId } = JSON.parse(event.body);
  console.log("Received userId:", userId);

  try {
    const customer = await stripe.customers.create({
      metadata: { userId },
    });
    console.log("Customer created with ID:", customer.id);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, // Amount in cents ($50)
      currency: 'usd',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log("Created PaymentIntent:", paymentIntent.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
