import type { FastifyPluginAsync } from "fastify";
import { Type } from "@sinclair/typebox";

const StudioWalletSchema = Type.Object({
  walletId: Type.String(),
  unit: Type.Literal("studioCredits"),
  plan: Type.Union([
    Type.Literal("free"),
    Type.Literal("creator"),
    Type.Literal("pro"),
  ]),
  posted: Type.Integer({ minimum: 0 }),
  reserved: Type.Integer({ minimum: 0 }),
  available: Type.Integer({ minimum: 0 }),
  rollover: Type.Literal(true),
  asOf: Type.String({ format: "date-time" }),
});

const ReaderWalletSchema = Type.Object({
  walletId: Type.String(),
  unit: Type.Literal("readerCoins"),
  purchased: Type.Integer({ minimum: 0 }),
  promotional: Type.Integer({ minimum: 0 }),
  available: Type.Integer({ minimum: 0 }),
  purchasedCoinsExpire: Type.Literal(false),
  asOf: Type.String({ format: "date-time" }),
});

export const walletRoutes: FastifyPluginAsync = async (app) => {
  app.get(
    "/studio",
    {
      schema: {
        tags: ["Wallets"],
        summary: "Read the personal workspace Studio Credit wallet",
        response: { 200: StudioWalletSchema },
      },
    },
    async () => ({
      walletId: "wallet_studio_demo",
      unit: "studioCredits" as const,
      plan: "creator" as const,
      posted: 25_000,
      reserved: 1_240,
      available: 23_760,
      rollover: true as const,
      asOf: new Date().toISOString(),
    }),
  );

  app.get(
    "/reader",
    {
      schema: {
        tags: ["Wallets"],
        summary: "Read the personal Reader Coin wallet",
        response: { 200: ReaderWalletSchema },
      },
    },
    async () => ({
      walletId: "wallet_reader_demo",
      unit: "readerCoins" as const,
      purchased: 240,
      promotional: 18,
      available: 258,
      purchasedCoinsExpire: false as const,
      asOf: new Date().toISOString(),
    }),
  );
};
