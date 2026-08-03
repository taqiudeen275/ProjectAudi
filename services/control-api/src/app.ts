import { randomUUID } from "node:crypto";
import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { InMemoryIdempotencyStore } from "./lib/idempotency.js";
import { healthRoutes } from "./modules/health/routes.js";
import { jobsRoutes } from "./modules/jobs/routes.js";
import { InMemoryJobStore } from "./modules/jobs/store.js";
import { modelsRoutes } from "./modules/models/routes.js";
import { walletRoutes } from "./modules/wallets/routes.js";

export type BuildAppOptions = {
  logger?: boolean;
  enableLocalFixtures?: boolean;
  fixtureToken?: string;
};

export async function buildApp(options: BuildAppOptions = {}) {
  const app = Fastify({
    logger: options.logger ?? false,
    genReqId: (request) => {
      const supplied = request.headers["x-correlation-id"];
      return typeof supplied === "string" && supplied.length <= 128 ? supplied : randomUUID();
    },
  });

  await app.register(swagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "AudiLink Control API",
        description: "Versioned application contracts for Studio, Books, Admin, and workers.",
        version: "0.1.0",
      },
      tags: [
        { name: "Health" },
        { name: "Models" },
        { name: "Jobs" },
        { name: "Wallets" },
      ],
    },
  });

  await app.register(swaggerUi, {
    routePrefix: "/reference",
    uiConfig: { docExpansion: "list", deepLinking: false },
  });

  app.addHook("onSend", async (request, reply, payload) => {
    reply.header("x-correlation-id", request.id);
    return payload;
  });

  app.setErrorHandler((error, request, reply) => {
    request.log.warn({ err: error, correlationId: request.id }, "request failed");
    const taggedError =
      typeof error === "object" && error !== null
        ? (error as { message?: unknown; statusCode?: unknown; validation?: unknown })
        : {};
    const statusCode =
      typeof taggedError.statusCode === "number" && taggedError.statusCode >= 400
        ? taggedError.statusCode
        : 500;
    const safeMessage =
      typeof taggedError.message === "string" ? taggedError.message : "The request could not be completed.";
    reply.code(statusCode).send({
      code: taggedError.validation ? "VALIDATION_ERROR" : "REQUEST_FAILED",
      message: statusCode >= 500 ? "The request could not be completed." : safeMessage,
      correlationId: request.id,
    });
  });

  const jobs = new InMemoryJobStore();
  const idempotency = new InMemoryIdempotencyStore();

  await app.register(healthRoutes, { prefix: "/health" });
  await app.register(modelsRoutes, { prefix: "/v1/models" });
  if (options.enableLocalFixtures) {
    if (!options.fixtureToken) {
      throw new Error("fixtureToken is required when local fixture routes are enabled");
    }

    await app.register(
      async (fixtures) => {
        fixtures.addHook("preHandler", async (request, reply) => {
          if (request.headers["x-audilink-fixture-token"] !== options.fixtureToken) {
            return reply.code(401).send({
              code: "FIXTURE_AUTH_REQUIRED",
              message: "A valid local fixture token is required.",
            });
          }
        });
        await fixtures.register(walletRoutes, { prefix: "/wallets" });
        await fixtures.register(jobsRoutes, { prefix: "/jobs", jobs, idempotency });
      },
      { prefix: "/v1/fixtures" },
    );
  }

  app.get("/openapi.json", { schema: { hide: true } }, async () => app.swagger());

  return app;
}
