import type { FixedLengthArray } from "type-fest";

export interface Artifact {
  artifactId: number;
  name: string;
  skills: FixedLengthArray<Skill, 4>;
  id: number;
  level: string;
  kind: string;
  attribute: string;
}

export interface Skill {
  skillId: number;
  name: string;
  isMaxQuality: boolean;
  effectValue: string;
}
