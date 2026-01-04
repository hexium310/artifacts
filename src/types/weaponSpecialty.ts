type Kind = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type WeaponSpecialtyId = "sabre"
  | "dagger"
  | "spear"
  | "axe"
  | "staff"
  | "gun"
  | "melee"
  | "bow"
  | "harp"
  | "katana";

export interface WeaponSpecialty {
  kind: Kind;
  id: WeaponSpecialtyId;
  text: string;
}
