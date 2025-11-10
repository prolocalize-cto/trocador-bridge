import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config({
  path: process.env.ENV_FILE || undefined,
});

const app = express();

const PORT = Number(process.env.PORT) || 4000;
const TROCADOR_API_KEY = process.env.TROCADOR_API_KEY;
const TARGET = "https://api.trocador.app";

if (!TROCADOR_API_KEY) {
  console.warn(
    "[proxy] TROCADOR_API_KEY is not set. Requests will fail with 401."
  );
}

app.disable("x-powered-by");

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use(
  "/api/trocador",
  createProxyMiddleware({
    target: TARGET,
    changeOrigin: true,
    logLevel: "warn",
    pathRewrite: {
      "^/api/trocador": "",
    },
    onProxyReq: (proxyReq) => {
      if (TROCADOR_API_KEY) {
        proxyReq.setHeader("API-Key", TROCADOR_API_KEY);
      }
      proxyReq.setHeader("Content-Type", "application/json");
    },
    onProxyRes: (proxyRes) => {
      proxyRes.headers["access-control-allow-origin"] = "*";
      proxyRes.headers["access-control-allow-methods"] = "GET,POST,OPTIONS";
      proxyRes.headers["access-control-allow-headers"] = "Content-Type,API-Key";
    },
  })
);

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    path: req.originalUrl,
  });
});

app.use((err, _req, res, _next) => {
  console.error("[proxy] Unhandled error:", err);
  res.status(500).json({
    error: "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`[proxy] listening on http://localhost:${PORT}`);
  console.log(`[proxy] forwarding /api/trocador -> ${TARGET}`);
});
