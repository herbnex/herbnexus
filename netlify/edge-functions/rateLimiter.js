import { getStore } from '@netlify/blobs';

const rateLimitConfig = { maxUpdates: 5, timeSpan: 60 }; // 5 requests per 60 seconds (1 minute)

export default async (request) => {
  console.log('Rate Limiter Invoked');

  const ip = request.headers.get('x-forwarded-for') || request.headers.get('client-ip');
  if (!ip) {
    console.log('IP address not found in headers');
    return new Response('Internal Server Error', { status: 500 });
  }

  const identifier = 'limiter_' + ip;
  const visits = getStore('visits');
  const t = await visits.get(identifier);
  const currentTime = new Date().getTime();

  let rateLimitExceeded = false;
  let responseMessage = '';

  if (t) {
    const { count_updates, last_update } = JSON.parse(t);
    const timeDifference = Math.floor((currentTime - last_update) / 1000);

    if (timeDifference >= rateLimitConfig.timeSpan) {
      await visits.set(identifier, JSON.stringify({ count_updates: 1, last_update: currentTime }));
      responseMessage = 'Reload 4 more times to exceed the rate limit.';
    } else {
      if (count_updates < rateLimitConfig.maxUpdates) {
        await visits.set(identifier, JSON.stringify({ count_updates: count_updates + 1, last_update: currentTime }));
        responseMessage = `Reload ${rateLimitConfig.maxUpdates - count_updates} more time(s) to exceed the rate limit.`;
      } else {
        rateLimitExceeded = true;
        responseMessage = 'Rate limit exceeded.';
      }
    }
  } else {
    await visits.set(identifier, JSON.stringify({ count_updates: 1, last_update: currentTime }));
    responseMessage = 'Reload 4 more times to exceed the rate limit.';
  }

  if (rateLimitExceeded) {
    return new Response(responseMessage, { status: 429 });
  }

  // Fetch the original request
  const originalResponse = await fetch(request);

  // Clone the original response to modify headers
  const newResponse = new Response(originalResponse.body, originalResponse);

  // Add custom header for rate limit info
  newResponse.headers.set('X-RateLimit-Info', responseMessage);

  return newResponse;
};

export const config = {
  path: "/*",
};
