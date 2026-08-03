import type { FastifyPluginAsync } from "fastify";
import { Type, type Static } from "@sinclair/typebox";
import { InMemoryIdempotencyStore } from "../../lib/idempotency.js";
import { InMemoryJobStore, jobKinds, jobModes } from "./store.js";

const JobSchema = Type.Object({
  id: Type.String(),
  kind: Type.Union(jobKinds.map((value) => Type.Literal(value))),
  mode: Type.Union(jobModes.map((value) => Type.Literal(value))),
  state: Type.Object({
    kind: Type.Literal("queued"),
    queuedAt: Type.String({ format: "date-time" }),
  }),
  inputSummary: Type.String(),
  modelRoute: Type.String(),
  estimate: Type.Object({
    unit: Type.Literal("studio_credit"),
    amount: Type.Integer({ minimum: 1 }),
    expiresAt: Type.String({ format: "date-time" }),
  }),
  progress: Type.Number({ minimum: 0, maximum: 1 }),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

const CreateJobSchema = Type.Object({
  kind: Type.Union(jobKinds.map((value) => Type.Literal(value))),
  mode: Type.Union(jobModes.map((value) => Type.Literal(value))),
  inputSummary: Type.String({ minLength: 1, maxLength: 240 }),
  requestedUnits: Type.Integer({ minimum: 1, maximum: 10_000_000 }),
});

const JobParamsSchema = Type.Object({ id: Type.String({ minLength: 1 }) });
const IdempotencyHeadersSchema = Type.Object(
  {
    "idempotency-key": Type.String({ minLength: 8, maxLength: 200 }),
    "x-audilink-workspace-id": Type.String({ minLength: 8, maxLength: 200 }),
  },
  { additionalProperties: true },
);

type CreateJobBody = Static<typeof CreateJobSchema>;
type JobParams = Static<typeof JobParamsSchema>;
type IdempotencyHeaders = Static<typeof IdempotencyHeadersSchema>;

export type JobsRoutesOptions = {
  jobs: InMemoryJobStore;
  idempotency: InMemoryIdempotencyStore;
};

export const jobsRoutes: FastifyPluginAsync<JobsRoutesOptions> = async (app, options) => {
  app.get(
    "/",
    {
      schema: {
        tags: ["Jobs"],
        summary: "List generation jobs",
        response: { 200: Type.Object({ jobs: Type.Array(JobSchema) }) },
      },
    },
    async () => ({ jobs: options.jobs.list() }),
  );

  app.post<{ Body: CreateJobBody; Headers: IdempotencyHeaders }>(
    "/",
    {
      schema: {
        tags: ["Jobs"],
        summary: "Create a local fixture generation job with a server-computed estimate",
        headers: IdempotencyHeadersSchema,
        body: CreateJobSchema,
        response: { 201: JobSchema, 409: Type.Object({ code: Type.String(), message: Type.String() }) },
      },
    },
    async (request, reply) => {
      const result = options.idempotency.execute(
        "create-job",
        request.headers["x-audilink-workspace-id"],
        request.headers["idempotency-key"],
        request.body,
        () => options.jobs.create(request.body),
      );

      if (result.kind === "conflict") {
        return reply.code(409).send({
          code: "IDEMPOTENCY_KEY_REUSED",
          message: "The idempotency key was already used with a different request.",
        });
      }

      reply.header("idempotent-replayed", result.kind === "replayed" ? "true" : "false");
      return reply.code(201).send(result.value);
    },
  );

  app.get<{ Params: JobParams }>(
    "/:id",
    {
      schema: {
        tags: ["Jobs"],
        summary: "Read a generation job",
        params: JobParamsSchema,
        response: {
          200: JobSchema,
          404: Type.Object({ code: Type.String(), message: Type.String() }),
        },
      },
    },
    async (request, reply) => {
      const job = options.jobs.get(request.params.id);
      if (!job) {
        return reply.code(404).send({ code: "JOB_NOT_FOUND", message: "Generation job not found." });
      }
      return reply.send(job);
    },
  );

  app.get<{ Params: JobParams }>(
    "/:id/events",
    {
      schema: {
        tags: ["Jobs"],
        summary: "Stream versioned job progress events over SSE",
        params: JobParamsSchema,
      },
    },
    async (request, reply) => {
      const job = options.jobs.get(request.params.id);
      if (!job) {
        return reply.code(404).send({ code: "JOB_NOT_FOUND", message: "Generation job not found." });
      }

      reply.hijack();
      reply.raw.writeHead(200, {
        "cache-control": "no-cache, no-transform",
        connection: "keep-alive",
        "content-type": "text/event-stream; charset=utf-8",
        "x-accel-buffering": "no",
      });
      reply.raw.write(`id: ${job.updatedAt}\n`);
      reply.raw.write("event: job.snapshot\n");
      reply.raw.write(`data: ${JSON.stringify({ version: 1, job })}\n\n`);
      reply.raw.end();
    },
  );
};
