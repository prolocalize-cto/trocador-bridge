/**
 * Vercel Serverless Function to proxy Trocador API requests
 * This solves CORS issues in production by making requests server-side
 */

export default async function handler(req, res) {
  const TROCADOR_API_KEY = "1LSAndusd1FAicVo4CzYTwGJhD5FBz";
  
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Accept, API-Key'
  );
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Parse the URL to get the full path with query parameters
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathAndQuery = url.pathname.replace(/^\/api\/trocador/, '') + url.search;
    
    // Build the full Trocador API URL
    const trocadorUrl = `https://api.trocador.app${pathAndQuery}`;
    
    console.log('Proxying request to:', trocadorUrl);
    
    // Forward the request to Trocador API
    const response = await fetch(trocadorUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'API-Key': TROCADOR_API_KEY,
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });
    
    // Get the response data
    const data = await response.json();
    
    console.log('Trocador API response status:', response.status);
    
    // Return the response from Trocador
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Trocador API proxy error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch from Trocador API',
      message: error.message 
    });
  }
}

