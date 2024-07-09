import { getStore } from '@netlify/blobs';

const rateLimitConfig = { maxUpdates: 5, timeSpan: 60 }; // 5 requests per 60 seconds (1 minute)

export default async (request, context) => {
  console.log('Rate Limiter Invoked');

  // Retrieve the IP address
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

  let rateLimitExceeded = false;
  let responseMessage = '';

  // If a rate limiting key is found
  if (t) {
    // Get rate limit data for the key
    const { count_updates, last_update } = JSON.parse(t);

    // Calculate time difference in seconds
    const timeDifference = Math.floor((currentTime - last_update) / 1000);

    // If time window has passed, reset count
    if (timeDifference >= rateLimitConfig.timeSpan) {
      await visits.set(identifier, JSON.stringify({ count_updates: 1, last_update: currentTime }));
      responseMessage = 'Reload 4 more times to exceed the rate limit.';
    } else {
      // Check if the request count is below the limit
      if (count_updates < rateLimitConfig.maxUpdates) {
        // Increment the number of updates in the store
        await visits.set(identifier, JSON.stringify({ count_updates: count_updates + 1, last_update: currentTime }));
        responseMessage = `Reload ${rateLimitConfig.maxUpdates - count_updates} more time(s) to exceed the rate limit.`;
      } else {
        // If the limits equal or exceeds, set rate limit exceeded flag
        rateLimitExceeded = true;
        responseMessage = 'Rate limit exceeded.';
      }
    }
  } else {
    // If a key is not found, set the key with a single update and continue
    await visits.set(identifier, JSON.stringify({ count_updates: 1, last_update: currentTime }));
    responseMessage = 'Reload 4 more times to exceed the rate limit.';
  }

  if (rateLimitExceeded) {
    return new Response(responseMessage, { status: 429 });
  }

  // Return the original request to the main site content
  return await fetch(request);
};

// Configure the rate limiting
export const config = {
  path: "/*",
  rateLimit: {
    windowLimit: 5, // Max 5 requests
    window: 60, // Per 60 seconds (1 minute)
    aggregateBy: ["ip"], // Aggregate by IP address
    action: "block", // Block requests exceeding the limit
  },
};
