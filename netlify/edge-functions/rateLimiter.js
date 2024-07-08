export default async (request, context) => {
    console.log('Rate Limiter Invoked');
  
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('client-ip');
    if (!ip) {
      console.log('IP address not found in headers');
      return new Response('Internal Server Error', { status: 500 });
    }
  
    const getTimestamp = () => Math.floor(Date.now() / 1000);
    const currentTime = getTimestamp();
    const rateLimitKey = `rate-limit-${ip}`;
  
    // Check if the rate limit data is already in the cache
    let rateLimitData = context.cache.get(rateLimitKey);
    if (!rateLimitData) {
      rateLimitData = { count: 1, lastRequest: currentTime, blockedUntil: 0 };
      context.cache.set(rateLimitKey, rateLimitData, 60); // Set cache expiration to 60 seconds
      console.log(`Initial request from IP: ${ip}`);
      return new Response('OK', { status: 200 });
    }
  
    console.log(`IP: ${ip}, Current Time: ${currentTime}, Rate Limit Data: ${JSON.stringify(rateLimitData)}`);
  
    if (rateLimitData.blockedUntil > currentTime) {
      console.log(`IP ${ip} is currently blocked until ${rateLimitData.blockedUntil}`);
      return new Response('Too Many Requests - Try again later', { status: 429 });
    }
  
    if (currentTime - rateLimitData.lastRequest < 60) {
      if (rateLimitData.count >= 5) {
        rateLimitData.blockedUntil = currentTime + 60;
        rateLimitData.count = 0; // Reset count after blocking
        context.cache.set(rateLimitKey, rateLimitData, 60); // Update cache with blocking info
        console.log(`Rate limit exceeded for IP: ${ip}, blocking for 60 seconds`);
        return new Response('Too Many Requests - Blocked for 60 seconds', { status: 429 });
      }
      rateLimitData.count += 1;
    } else {
      rateLimitData.count = 1;
    }
    rateLimitData.lastRequest = currentTime;
  
    context.cache.set(rateLimitKey, rateLimitData, 60); // Update cache with the latest data
    console.log(`Updated Rate Limit Data: ${JSON.stringify(rateLimitData)}`);
  
    return new Response('OK', { status: 200 });
  };
  