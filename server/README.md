# Ghost Swap Proxy Backend

Simple Express proxy that forwards `/api/trocador` requests to the Trocador API and injects the required headers. Deploy this alongside the built front-end to avoid CORS restrictions.

## Setup

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Copy the environment template and provide your API key:
   ```bash
   cp env.example .env
   ```
   Update `.env`:
   ```
   PORT=4000
   TROCADOR_API_KEY=your-real-api-key
   ```
3. Start the proxy:
   ```bash
   npm start
   ```

The proxy listens on `http://localhost:4000` by default. All requests to `/api/trocador/*` will be forwarded to `https://api.trocador.app/*`.

## Deployment Notes

- Place this service behind your Apache/Nginx reverse proxy (e.g. proxy `/api/trocador` to `http://localhost:4000/api/trocador`).
- Ensure the front-end calls the proxy endpoint instead of hitting the Trocador domain directly to avoid CORS issues.

