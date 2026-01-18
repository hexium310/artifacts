import type { ElementId } from "@/types/element";
import type { WeaponSpecialtyId } from "@/types/weaponSpecialty";

export type ElementFilterStatus = Record<ElementId, boolean>;
export type WeaponSpecialtyFilterStatus = Record<WeaponSpecialtyId, boolean>;

export interface Filters {
  element: ElementFilterStatus;
  weaponSpecialty: WeaponSpecialtyFilterStatus;
  skill: {
    filterType: string;
    values: readonly string[];
  };
}

export const elmentFilterDefault = {
  fire: false,
  water: false,
  earth: false,
  wind: false,
  light: false,
  dark: false,
};

export const weaponSpecialtyFilterDefault = {
  sabre: false,
  dagger: false,
  spear: false,
  axe: false,
  staff: false,
  gun: false,
  melee: false,
  bow: false,
  harp: false,
  katana: false,
};

export const skillFilterDefault = [] satisfies string[];

export const skillFilterTypeDefault = "marking";

export const filtersDefault = {
  element: elmentFilterDefault,
  weaponSpecialty: weaponSpecialtyFilterDefault,
  skill: {
    filterType: skillFilterTypeDefault,
    values: skillFilterDefault,
  },
} satisfies Filters;
