import type { FixedLengthArray } from "type-fest";

import type { Element } from "@/types/element";
import type { WeaponSpecialty } from "@/types/weaponSpecialty";

export interface Artifact {
  artifactId: number;
  name: string;
  skills: FixedLengthArray<Skill, 4>;
  id: number;
  level: string;
  element: Element;
  weaponSpecialty: WeaponSpecialty;
}

export interface Skill {
  id: string;
  name: string;
  isMaxQuality: boolean;
  effectValue: string;
}
