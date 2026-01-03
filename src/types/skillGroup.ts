import type { FixedLengthArray } from "type-fest";

export type SkillGroup = Record<string, string>;
export type SkillGroups = FixedLengthArray<SkillGroup, 3>;
