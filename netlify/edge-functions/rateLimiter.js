export default async (request, context) => {
    console.log('Rate Limiter Invoked');
    
    // Log the IP for debugging
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('client-ip');
    console.log(`IP: ${ip}`);
  
    // Allow the request to continue
    return fetch(request);
  };
  
  export const config = {
    path: "/*",
    rateLimit: {
      windowLimit: 5, // Max 5 requests
      window: 60, // Per 60 seconds (1 minute)
      aggregateBy: ["ip"], // Aggregate by IP address
      action: "block", // Block requests exceeding the limit
    },
  };
  