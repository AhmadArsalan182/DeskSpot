import express from "express";
import cors from "cors";
import helmet from "helmet";

export function createApp({ frontendOrigin }) {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: frontendOrigin, credentials: true }));
  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  return app;
}