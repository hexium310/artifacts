import type { JsonObject } from "type-fest";

export const parseJson = (json: string): JsonObject | null => {
  try {
    return JSON.parse(json) as JsonObject;
  } catch (_) {
    return null;
  }
};
