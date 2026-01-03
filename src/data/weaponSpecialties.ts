export type WeaponSpecialty = typeof WeaponSpecialty[keyof typeof WeaponSpecialty];
export type WeaponSpecialtyId = Lowercase<keyof typeof WeaponSpecialty>;
type Kind = typeof kinds[number];

interface WeaponSpecialtyRelation {
  kind: Kind;
  id: WeaponSpecialtyId;
  text: WeaponSpecialty;
}

const kinds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export const WeaponSpecialty = {
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
    text: WeaponSpecialty.Sabre,
  },
  {
    kind: 2,
    id: "dagger",
    text: WeaponSpecialty.Dagger,
  },
  {
    kind: 3,
    id: "spear",
    text: WeaponSpecialty.Spear,
  },
  {
    kind: 4,
    id: "axe",
    text: WeaponSpecialty.Axe,
  },
  {
    kind: 5,
    id: "staff",
    text: WeaponSpecialty.Staff,
  },
  {
    kind: 6,
    id: "gun",
    text: WeaponSpecialty.Gun,
  },
  {
    kind: 7,
    id: "melee",
    text: WeaponSpecialty.Melee,
  },
  {
    kind: 8,
    id: "bow",
    text: WeaponSpecialty.Bow,
  },
  {
    kind: 9,
    id: "harp",
    text: WeaponSpecialty.Harp,
  },
  {
    kind: 10,
    id: "katana",
    text: WeaponSpecialty.Katana,
  },
] satisfies WeaponSpecialtyRelation[];

const isKind = (number: number): number is Kind => {
  return kinds.includes(number as Kind);
};

export const getWeaponSpecialtyFromKind = (kind: number): WeaponSpecialtyRelation | undefined => {
  if (!isKind(kind)) {
    return undefined;
  }

  return weaponSpecialties.find((weaponSpecialty) => weaponSpecialty.kind == kind);
};
