import { buildApp } from "./app.js";

const enableLocalFixtures = process.env.AUDILINK_ENABLE_LOCAL_FIXTURES === "true";
const fixtureToken = process.env.AUDILINK_FIXTURE_TOKEN;
const app = await buildApp({
  logger: true,
  enableLocalFixtures,
  ...(fixtureToken === undefined ? {} : { fixtureToken }),
});
const port = Number.parseInt(process.env.PORT ?? "4100", 10);
const host = process.env.HOST ?? "127.0.0.1";

const close = async (signal: string) => {
  app.log.info({ signal }, "shutting down");
  await app.close();
  process.exit(0);
};

process.on("SIGINT", () => void close("SIGINT"));
process.on("SIGTERM", () => void close("SIGTERM"));

try {
  await app.listen({ host, port });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
