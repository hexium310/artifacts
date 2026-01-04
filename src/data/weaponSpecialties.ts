import type { WeaponSpecialty } from "@/types/weaponSpecialty";

export type WeaponSpecialtyText = typeof WeaponSpecialtyText[keyof typeof WeaponSpecialtyText];

export const WeaponSpecialtyText = {
  Sabre: "剣",
  Dagger: "短剣",
  Spear: "槍",
  Axe: "斧",
  Staff: "杖",
  Gun: "銃",
  Melee: "格闘",
  Bow: "弓",
  Harp: "楽器",
  Katana: "刀",
} as const;

export const weaponSpecialties = [
  {
    kind: 1,
    id: "sabre",
    text: WeaponSpecialtyText.Sabre,
  },
  {
    kind: 2,
    id: "dagger",
    text: WeaponSpecialtyText.Dagger,
  },
  {
    kind: 3,
    id: "spear",
    text: WeaponSpecialtyText.Spear,
  },
  {
    kind: 4,
    id: "axe",
    text: WeaponSpecialtyText.Axe,
  },
  {
    kind: 5,
    id: "staff",
    text: WeaponSpecialtyText.Staff,
  },
  {
    kind: 6,
    id: "gun",
    text: WeaponSpecialtyText.Gun,
  },
  {
    kind: 7,
    id: "melee",
    text: WeaponSpecialtyText.Melee,
  },
  {
    kind: 8,
    id: "bow",
    text: WeaponSpecialtyText.Bow,
  },
  {
    kind: 9,
    id: "harp",
    text: WeaponSpecialtyText.Harp,
  },
  {
    kind: 10,
    id: "katana",
    text: WeaponSpecialtyText.Katana,
  },
] satisfies WeaponSpecialty[];

export const getWeaponSpecialtyByKind = (kind: number): WeaponSpecialty | undefined => {
  return weaponSpecialties.find((weaponSpecialty) => weaponSpecialty.kind === kind);
};

export const getWeaponSpecialty = (id: string): WeaponSpecialty | undefined => {
  return weaponSpecialties.find((weaponSpecialty) => weaponSpecialty.id === id);
};
