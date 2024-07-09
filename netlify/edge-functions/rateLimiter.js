import { getStore } from '@netlify/blobs';

const rateLimitConfig = { maxUpdates: 3, timeSpan: 86400 };

export default async (request, context) => {
  console.log('Rate Limiter Invoked');

  // Create a unique identifier based on user's IP
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('client-ip');
  if (!ip) {
    console.log('IP address not found in headers');
    return new Response('Internal Server Error', { status: 500 });
  }

  const identifier = 'limiter_' + ip;

  // Get the visits store
  const visits = getStore('visits');
  const t = await visits.get(identifier);

  // Current time
  const currentTime = new Date().getTime();

  let responseMessage = '';

  // If a rate limiting key is found
  if (t) {
    // Get rate limit data for the key
    const { count_updates, last_update } = JSON.parse(t);

    // Calculate time difference in seconds
    const timeDifference = Math.floor((currentTime - new Date(last_update).getTime()) / 1000);

    // If time window has passed, reset count
    if (timeDifference >= rateLimitConfig.timeSpan) {
      await visits.set(identifier, JSON.stringify({ count_updates: 1, last_update: currentTime }));
      responseMessage = 'Reload 2 more times to exceed the rate limit.';
    } else {
      // Check if the request count is below the limit
      if (count_updates < rateLimitConfig.maxUpdates) {
        // Increment the number of updates in the store
        await visits.set(identifier, JSON.stringify({ count_updates: count_updates + 1, last_update: currentTime }));
        responseMessage = `Reload ${rateLimitConfig.maxUpdates - count_updates} more time(s) to exceed the rate limit.`;
      } else {
        // If the limits equal or exceeds, return with a rate limit exceeded message
        return new Response('Rate limit exceeded.', { status: 429 });
      }
    }
  } else {
    // If a key is not found, set the key with a single update and continue
    await visits.set(identifier, JSON.stringify({ count_updates: 1, last_update: currentTime }));
    responseMessage = 'Reload 2 more times to exceed the rate limit.';
  }

  // Fetch the original request
  const originalResponse = await fetch(request);

  // Clone the original response to modify headers
  const newResponse = new Response(originalResponse.body, originalResponse);

  // Add custom header for rate limit info
  newResponse.headers.set('X-RateLimit-Info', responseMessage);

  return newResponse;
};

// Configure the rate limiting
export const config = {
  path: "/*",
  rateLimit: {
    windowLimit: 100, // Max 3 requests
    window: 60, // Per 86400 seconds (1 day)
    aggregateBy: ["ip"], // Aggregate by IP address
    action: "block", // Block requests exceeding the limit
  },
};
