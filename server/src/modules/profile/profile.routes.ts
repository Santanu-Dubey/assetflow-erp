import { Router } from "express";

export const profileRouter = Router();

profileRouter.get("/", (request, response) => {
  response.json({ data: request.user });
});
