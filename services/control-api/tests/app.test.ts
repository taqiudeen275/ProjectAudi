import assert from "node:assert/strict";
import test from "node:test";
import { buildApp } from "../src/app.js";

const fixtureToken = "test-fixture-token";
const fixtureHeaders = {
  "x-audilink-fixture-token": fixtureToken,
  "x-audilink-workspace-id": "workspace_test_0001",
};

test("health and OpenAPI are available", async (t) => {
  const app = await buildApp();
  t.after(() => app.close());

  const health = await app.inject({ method: "GET", url: "/health/live" });
  assert.equal(health.statusCode, 200);
  assert.equal(health.json().status, "ok");
  assert.ok(health.headers["x-correlation-id"]);

  const readiness = await app.inject({ method: "GET", url: "/health/ready" });
  assert.equal(readiness.statusCode, 200);
  assert.equal(readiness.json().mode, "foundation");
  assert.equal(readiness.json().dependencies.postgres, "not-configured");

  const contract = await app.inject({ method: "GET", url: "/openapi.json" });
  assert.equal(contract.statusCode, 200);
  assert.equal(contract.json().info.title, "AudiLink Control API");
});

test("local fixture routes are absent by default and require their fixture token", async (t) => {
  const productionShape = await buildApp();
  t.after(() => productionShape.close());

  const absent = await productionShape.inject({
    method: "GET",
    url: "/v1/fixtures/wallets/studio",
  });
  assert.equal(absent.statusCode, 404);

  const fixtureShape = await buildApp({ enableLocalFixtures: true, fixtureToken });
  t.after(() => fixtureShape.close());

  const missingToken = await fixtureShape.inject({
    method: "GET",
    url: "/v1/fixtures/wallets/studio",
    headers: { "x-audilink-workspace-id": "workspace_test_0001" },
  });
  assert.equal(missingToken.statusCode, 401);

  const badToken = await fixtureShape.inject({
    method: "GET",
    url: "/v1/fixtures/wallets/studio",
    headers: {
      "x-audilink-fixture-token": "incorrect-token",
      "x-audilink-workspace-id": "workspace_test_0001",
    },
  });
  assert.equal(badToken.statusCode, 401);
});

test("job creation requires and honors idempotency keys", async (t) => {
  const app = await buildApp({ enableLocalFixtures: true, fixtureToken });
  t.after(() => app.close());

  const body = {
    kind: "textToSpeech",
    mode: "fast",
    inputSummary: "Opening narration, 42 words",
    requestedUnits: 72,
  };

  const missingKey = await app.inject({
    method: "POST",
    url: "/v1/fixtures/jobs",
    headers: { "x-audilink-fixture-token": fixtureToken },
    payload: body,
  });
  assert.equal(missingKey.statusCode, 400);

  const first = await app.inject({
    method: "POST",
    url: "/v1/fixtures/jobs",
    headers: { ...fixtureHeaders, "idempotency-key": "test-create-0001" },
    payload: body,
  });
  assert.equal(first.statusCode, 201);
  assert.equal(first.headers["idempotent-replayed"], "false");

  const replay = await app.inject({
    method: "POST",
    url: "/v1/fixtures/jobs",
    headers: { ...fixtureHeaders, "idempotency-key": "test-create-0001" },
    payload: body,
  });
  assert.equal(replay.statusCode, 201);
  assert.equal(replay.headers["idempotent-replayed"], "true");
  assert.equal(replay.json().id, first.json().id);

  const conflict = await app.inject({
    method: "POST",
    url: "/v1/fixtures/jobs",
    headers: { ...fixtureHeaders, "idempotency-key": "test-create-0001" },
    payload: { ...body, requestedUnits: 73 },
  });
  assert.equal(conflict.statusCode, 409);
});

test("Studio Credits and Reader Coins remain separate wallet units", async (t) => {
  const app = await buildApp({ enableLocalFixtures: true, fixtureToken });
  t.after(() => app.close());

  const studio = await app.inject({ method: "GET", url: "/v1/fixtures/wallets/studio", headers: fixtureHeaders });
  const reader = await app.inject({ method: "GET", url: "/v1/fixtures/wallets/reader", headers: fixtureHeaders });

  assert.equal(studio.json().unit, "studioCredits");
  assert.equal(studio.json().rollover, true);
  assert.equal(reader.json().unit, "readerCoins");
  assert.equal(reader.json().purchasedCoinsExpire, false);
});

test("commercially blocked models remain visible but not approved", async (t) => {
  const app = await buildApp();
  t.after(() => app.close());

  const response = await app.inject({ method: "GET", url: "/v1/models" });
  assert.equal(response.statusCode, 200);
  const fish = response.json().routes.find((route: { family: string }) => route.family === "fish-speech");
  assert.equal(fish.approval, "license-blocked");
  assert.equal(fish.releaseStage, "internal");
  assert.deepEqual(fish.languages, []);
});

test("evaluation model routes stay internal and expose only language tags", async (t) => {
  const app = await buildApp();
  t.after(() => app.close());

  const response = await app.inject({ method: "GET", url: "/v1/models" });
  assert.equal(response.statusCode, 200);

  const routes = response.json().routes as Array<{
    approval: "approved" | "evaluation" | "license-blocked";
    releaseStage: "internal" | "beta" | "ga";
    languages: string[];
  }>;

  for (const route of routes) {
    if (route.approval === "evaluation") {
      assert.equal(route.releaseStage, "internal");
    }
    for (const language of route.languages) {
      assert.match(language, /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/);
    }
  }
});

test("job progress is framed as a versioned SSE snapshot", async (t) => {
  const app = await buildApp({ enableLocalFixtures: true, fixtureToken });
  t.after(() => app.close());

  const created = await app.inject({
    method: "POST",
    url: "/v1/fixtures/jobs",
    headers: { ...fixtureHeaders, "idempotency-key": "test-events-0001" },
    payload: {
      kind: "audiobookRender",
      mode: "studio",
      inputSummary: "Chapter one, approved revision 12",
      requestedUnits: 600,
    },
  });

  const events = await app.inject({
    method: "GET",
    url: `/v1/fixtures/jobs/${created.json().id}/events`,
    headers: fixtureHeaders,
  });
  assert.equal(events.statusCode, 200);
  assert.match(events.headers["content-type"] ?? "", /text\/event-stream/);
  assert.match(events.body, /event: job\.snapshot/);
  assert.match(events.body, /"version":1/);
});
