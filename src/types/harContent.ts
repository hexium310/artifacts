export interface RawPage {
  list: RawArtifact[];
  first: number;
  last: number;
  prev: number;
  next: number;
  count: number;
  current: number;
  options: RawOptions;
  default_selector: RawSelector;
  has_default_selector: boolean;
}

export interface RawArtifact {
  artifact_id: number;
  max_level: number;
  name: string;
  comment: string;
  rarity: string;
  skill1_info: RawSkill;
  skill2_info: RawSkill;
  skill3_info: RawSkill;
  skill4_info: RawSkill;
  id: number;
  level: string;
  kind: string;
  attribute: string;
  next_exp: number;
  remain_next_exp: number;
  exp_width: number;
  is_locked: boolean;
  is_unnecessary: boolean;
  equip_npc_info: RawNpc | [];
}

export interface RawSkill {
  skill_id: number;
  skill_quality: number;
  level: number;
  name: string;
  is_max_quality: boolean;
  effect_value: string;
  icon_image: string;
}

export interface RawOptions extends RawSelector {
  max_number: number;
  number: number;
  tpl_type: string;
}

export interface RawSelector {
  sort: Record<string, [number, number]>;
  filter: Record<string, string | number>;
}

export interface RawNpc {
  user_npc_id: number;
  image: string;
  name: string;
}
