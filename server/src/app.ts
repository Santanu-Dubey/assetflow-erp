import cors from "cors";
import express from "express";
import helmet from "helmet";
import { errorHandler } from "./common/middleware/errorHandler.js";
import { mockAuthMiddleware } from "./common/middleware/mockAuthMiddleware.js";
import { apiRouter } from "./routes/apiRouter.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use(mockAuthMiddleware);
  app.use("/api/v1", apiRouter);
  app.use(errorHandler);

  return app;
}
