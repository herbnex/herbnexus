export default async (context) => {
    // Log the context object for debugging
    console.log('Context:', JSON.stringify(context));
  
    const getTimestamp = () => Math.floor(Date.now() / 1000);
  
    // Safely access the headers
    const headers = context.request?.headers;
    if (!headers) {
      console.log('Headers not found in context.request');
      return new Response('Internal Server Error', { status: 500 });
    }
  
    const ip = headers.get('x-forwarded-for') || headers.get('client-ip');
    if (!ip) {
      console.log('IP address not found in headers');
      return new Response('Internal Server Error', { status: 500 });
    }
  
    const currentTime = getTimestamp();
    const rateLimitKey = `rate-limit-${ip}`;
  
    let rateLimitData = await context.storage.get(rateLimitKey);
    if (!rateLimitData) {
      rateLimitData = { count: 0, lastRequest: currentTime };
    }
  
    console.log(`IP: ${ip}, Current Time: ${currentTime}, Rate Limit Data: ${JSON.stringify(rateLimitData)}`);
  
    if (rateLimitData.count >= 100 && (currentTime - rateLimitData.lastRequest < 60)) {
      console.log(`Rate limit exceeded for IP: ${ip}`);
      return new Response('Too Many Requests', { status: 429 });
    } else if (currentTime - rateLimitData.lastRequest < 60) {
      rateLimitData.count += 1;
      rateLimitData.lastRequest = currentTime;
    } else {
      rateLimitData.count = 1;
      rateLimitData.lastRequest = currentTime;
    }
  
    await context.storage.set(rateLimitKey, rateLimitData);
    console.log(`Updated Rate Limit Data: ${JSON.stringify(rateLimitData)}`);
  
    return new Response('OK', { status: 200 });
  };
  