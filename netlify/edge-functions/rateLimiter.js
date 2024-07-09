export default async (request) => {
    console.log('Rate Limiter Invoked');
  
    // Log the IP for debugging
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('client-ip');
    console.log(`IP: ${ip}`);
  
    // Fetch the original request
    const originalResponse = await fetch(request);
  
    // Return the original response
    return originalResponse;
  };
  
  export const config = {
    path: "/*",
  };
  