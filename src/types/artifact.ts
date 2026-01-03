import type { FixedLengthArray } from "type-fest";

export interface Artifact {
  artifactId: number;
  name: string;
  skills: FixedLengthArray<Skill, 4>;
  id: number;
  level: string;
  // TODO: change it to weaponSpecialty id
  kind: string;
  // TODO: change it to element id
  attribute: string;
}

export interface Skill {
  skillId: number;
  name: string;
  isMaxQuality: boolean;
  effectValue: string;
}
