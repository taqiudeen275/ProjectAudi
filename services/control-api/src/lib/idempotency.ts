import { createHash } from "node:crypto";

type StoredMutation<T> = {
  fingerprint: string;
  value: T;
};

export type IdempotentResult<T> =
  | { kind: "created"; value: T }
  | { kind: "replayed"; value: T }
  | { kind: "conflict" };

export class InMemoryIdempotencyStore {
  readonly #mutations = new Map<string, StoredMutation<unknown>>();

  execute<T>(scope: string, actorScope: string, key: string, input: unknown, create: () => T): IdempotentResult<T> {
    const storageKey = `${scope}:${actorScope}:${key}`;
    const fingerprint = createHash("sha256")
      .update(JSON.stringify(input))
      .digest("hex");
    const existing = this.#mutations.get(storageKey) as StoredMutation<T> | undefined;

    if (existing) {
      if (existing.fingerprint !== fingerprint) {
        return { kind: "conflict" };
      }

      return { kind: "replayed", value: existing.value };
    }

    const value = create();
    this.#mutations.set(storageKey, { fingerprint, value });
    return { kind: "created", value };
  }

  clear() {
    this.#mutations.clear();
  }
}
