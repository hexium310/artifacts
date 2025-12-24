export interface Page {
  list: Artifact[];
  first: number;
  last: number;
  count: number;
  current: number;
}

export interface Artifact {
  artifact_id: number;
  name: string;
  skill1Info: Skill;
  skill2Info: Skill;
  skill3Info: Skill;
  skill4Info: Skill;
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
