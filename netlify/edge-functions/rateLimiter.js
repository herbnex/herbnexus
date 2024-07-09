import { Context } from "@netlify/edge-functions";

// Define the Edge Function
export default async (request, context) => {
  console.log('Rate Limiter Invoked');
  
  // Retrieve the IP address
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('client-ip');
  if (!ip) {
    console.log('IP address not found in headers');
    return new Response('Internal Server Error', { status: 500 });
  }

  // Get the current timestamp
  const getTimestamp = () => Math.floor(Date.now() / 1000);
  const currentTime = getTimestamp();
  const rateLimitKey = `rate-limit-${ip}`;

  // Parse cookies
  const cookies = request.headers.get('cookie') || '';
  const cookieMap = Object.fromEntries(cookies.split('; ').map(c => c.split('=')));

  let rateLimitData = cookieMap[rateLimitKey] ? JSON.parse(decodeURIComponent(cookieMap[rateLimitKey])) : null;

  if (!rateLimitData) {
    rateLimitData = { count: 1, lastRequest: currentTime, blockedUntil: 0 };
    console.log(`Initial request from IP: ${ip}`);
    const response = await fetch(request);
    const body = await response.text();
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Set-Cookie', `${rateLimitKey}=${encodeURIComponent(JSON.stringify(rateLimitData))}; Max-Age=60; Path=/`);
    return new Response(body, { status: response.status, headers: newHeaders });
  }

  console.log(`IP: ${ip}, Current Time: ${currentTime}, Rate Limit Data: ${JSON.stringify(rateLimitData)}`);

  if (rateLimitData.blockedUntil > currentTime) {
    console.log(`IP ${ip} is currently blocked until ${rateLimitData.blockedUntil}`);
    return new Response('Too Many Requests - Try again later', {
      status: 429,
      headers: {
        'Set-Cookie': `${rateLimitKey}=${encodeURIComponent(JSON.stringify(rateLimitData))}; Max-Age=60; Path=/`
      }
    });
  }

  if (currentTime - rateLimitData.lastRequest < 60) {
    if (rateLimitData.count >= 5) {
      rateLimitData.blockedUntil = currentTime + 60;
      rateLimitData.count = 0; // Reset count after blocking
      console.log(`Rate limit exceeded for IP: ${ip}, blocking for 60 seconds`);
      return new Response('Too Many Requests - Blocked for 60 seconds', {
        status: 429,
        headers: {
          'Set-Cookie': `${rateLimitKey}=${encodeURIComponent(JSON.stringify(rateLimitData))}; Max-Age=60; Path=/`
        }
      });
    }
    rateLimitData.count += 1;
  } else {
    rateLimitData.count = 1;
  }
  rateLimitData.lastRequest = currentTime;

  console.log(`Updated Rate Limit Data: ${JSON.stringify(rateLimitData)}`);

  const response = await fetch(request);
  const body = await response.text();
  const newHeaders = new Headers(response.headers);
  newHeaders.set('Set-Cookie', `${rateLimitKey}=${encodeURIComponent(JSON.stringify(rateLimitData))}; Max-Age=60; Path=/`);
  return new Response(body, { status: response.status, headers: newHeaders });
};

// Configure the rate limiting
export const config = {
  path: "/*",
  rateLimit: {
    windowLimit: 5, // Max 5 requests
    window: 60, // Per 60 seconds
    aggregateBy: ["ip"], // Aggregate by IP address
    action: "block", // Block requests exceeding the limit
  },
};
