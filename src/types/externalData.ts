import type { PartialDeep } from "type-fest";

export type ExternalData<T> = PartialDeep<T, { recurseIntoArrays: true }>;
