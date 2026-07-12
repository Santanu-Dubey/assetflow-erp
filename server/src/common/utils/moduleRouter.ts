import { Router } from "express";

export function createReadOnlyModuleRouter(moduleName: string) {
  const router = Router();

  router.get("/", (_request, response) => {
    response.json({
      data: [],
      meta: {
        module: moduleName,
        phase: "architecture-ready",
      },
    });
  });

  return router;
}
