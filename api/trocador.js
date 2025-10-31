/**
 * Vercel Serverless Function to proxy Trocador API requests
 * This solves CORS issues in production by making requests server-side
 */

export default async function handler(req, res) {
  const TROCADOR_API_KEY = "1LSAndusd1FAicVo4CzYTwGJhD5FBz";
  
  // Get the path after /api/trocador
  const path = req.url.replace(/^\/api\/trocador/, '');
  
  // Build the full Trocador API URL
  const trocadorUrl = `https://api.trocador.app${path}`;
  
  try {
    // Forward the request to Trocador API
    const response = await fetch(trocadorUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'API-Key': TROCADOR_API_KEY,
      },
    });
    
    // Get the response data
    const data = await response.json();
    
    // Set CORS headers to allow frontend access
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    
    // Return the response from Trocador
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Trocador API proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch from Trocador API',
      message: error.message 
    });
  }
}

