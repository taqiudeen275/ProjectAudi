import type { FastifyPluginAsync } from "fastify";
import { Type } from "@sinclair/typebox";

const HealthSchema = Type.Object({
  status: Type.Literal("ok"),
  service: Type.Literal("control-api"),
  version: Type.String(),
  time: Type.String({ format: "date-time" }),
});

const ReadinessSchema = Type.Intersect([
  HealthSchema,
  Type.Object({
    mode: Type.Literal("foundation"),
    dependencies: Type.Object({
      postgres: Type.Literal("not-configured"),
      workflows: Type.Literal("not-configured"),
      objectStorage: Type.Literal("not-configured"),
    }),
  }),
]);

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get(
    "/live",
    {
      schema: {
        tags: ["Health"],
        summary: "Process liveness",
        response: { 200: HealthSchema },
      },
    },
    async () => ({
      status: "ok" as const,
      service: "control-api" as const,
      version: "0.1.0",
      time: new Date().toISOString(),
    }),
  );

  app.get(
    "/ready",
    {
      schema: {
        tags: ["Health"],
        summary: "Readiness for the currently enabled foundation modules",
        response: { 200: ReadinessSchema },
      },
    },
    async () => ({
      status: "ok" as const,
      service: "control-api" as const,
      version: "0.1.0",
      time: new Date().toISOString(),
      mode: "foundation" as const,
      dependencies: {
        postgres: "not-configured" as const,
        workflows: "not-configured" as const,
        objectStorage: "not-configured" as const,
      },
    }),
  );
};
