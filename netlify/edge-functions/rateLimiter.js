export default async (context) => {
    const getTimestamp = () => Math.floor(Date.now() / 1000);
    const ip = context.request.headers.get('x-forwarded-for') || context.request.headers.get('client-ip');
    const currentTime = getTimestamp();
    const rateLimitKey = `rate-limit-${ip}`;
    const rateLimitData = await context.storage.get(rateLimitKey) || { count: 0, lastRequest: currentTime };
  
    if (rateLimitData.count >= 100 && (currentTime - rateLimitData.lastRequest < 60)) {
      return new Response('Too Many Requests', { status: 429 });
    } else if (currentTime - rateLimitData.lastRequest < 60) {
      rateLimitData.count += 1;
      rateLimitData.lastRequest = currentTime;
    } else {
      rateLimitData.count = 1;
      rateLimitData.lastRequest = currentTime;
    }
  
    await context.storage.set(rateLimitKey, rateLimitData);
    return new Response('OK', { status: 200 });
  };
  