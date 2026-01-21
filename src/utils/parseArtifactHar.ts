import { getElementByAttribute } from "@/data/elements";
import { getWeaponSpecialtyByKind } from "@/data/weaponSpecialties";

import type { Har } from "har-format";
import type { FixedLengthArray } from "type-fest";

import type { Artifact, Skill } from "@/types/artifact";
import type { ExternalData } from "@/types/externalData";
import type { RawArtifact, RawPage, RawSkill } from "@/types/harContent";
import type { SkillGroup, SkillGroups } from "@/types/skillGroup";

export type ParseArtifactHarResult = [Artifact[], Record<number, { page: number; position: number }>, SkillGroups];

const parseSkillId = (id: number): string => id.toString().slice(0, -1);

const pickSkill = (skill: ExternalData<RawSkill>): Skill => {
  if (skill.skill_id === undefined
    || skill.name === undefined
    || skill.is_max_quality === undefined
    || skill.effect_value === undefined) {
    throw new Error("skill property is undefined");
  }

  return {
    id: parseSkillId(skill.skill_id),
    name: skill.name,
    isMaxQuality: skill.is_max_quality,
    effectValue: skill.effect_value,
  };
};

const pickArtifact = (artifact: ExternalData<RawArtifact>): Artifact => {
  const {
    artifact_id,
    name,
    skill1_info,
    skill2_info,
    skill3_info,
    skill4_info,
    id,
    level,
    kind,
    attribute,
  } = artifact;

  if (artifact_id === undefined
    || name === undefined
    || skill1_info === undefined
    || skill2_info === undefined
    || skill3_info === undefined
    || skill4_info === undefined
    || id === undefined
    || level === undefined
    || kind === undefined
    || attribute === undefined) {
    throw new Error("artifact property is undefined");
  }

  const skills = [
    pickSkill(skill1_info),
    pickSkill(skill2_info),
    pickSkill(skill3_info),
    pickSkill(skill4_info),
  ] satisfies FixedLengthArray<Skill, 4>;

  const element = getElementByAttribute(Number.parseInt(attribute));

  if (element === undefined) {
    throw new Error("cannot get element by attribute");
  }

  const weaponSpecialty = getWeaponSpecialtyByKind(Number.parseInt(kind));

  if (weaponSpecialty === undefined) {
    throw new Error("cannot get weapon specialty by kind");
  }

  return {
    artifactId: artifact_id,
    name,
    skills,
    id,
    level,
    element,
    weaponSpecialty,
  };
};

const groupSkill = (skill: Skill): SkillGroup => {
  const { id, name } = skill;

  return { [id]: name };
};

const destructiveMergeSkillGroup = (base: SkillGroup, skillGroup: SkillGroup): void => {
  Object.assign(base, skillGroup);
};

const defaultValue = (): ParseArtifactHarResult => [[], {}, [{}, {}, {}]];

export const parseArtifactHar = (har: ExternalData<Har> | null): ParseArtifactHarResult => {
  const result = har?.log?.entries?.reduce<ParseArtifactHarResult>((pageAccumulator, entry, pageIndex) => {
    const text = entry.response?.content?.text;
    if (text === undefined) {
      throw new Error("har response text is undefined");
    }

    const page = JSON.parse(text) as ExternalData<RawPage>;

    const [artifacts, artifactPositions, skillGroups] = page.list?.reduce<ParseArtifactHarResult>((listAccumulator, item, listIndex) => {
      const artifact = pickArtifact(item);
      const listArtifactAccumulator = listAccumulator[0];
      const listArtifactPositionsAccumulator = listAccumulator[1];
      const listSkillGroupsAccumulator = listAccumulator[2];

      listArtifactAccumulator.push(artifact);
      listArtifactPositionsAccumulator[artifact.id] = { page: pageIndex + 1, position: listIndex };
      destructiveMergeSkillGroup(listSkillGroupsAccumulator[0], groupSkill(artifact.skills[0]));
      destructiveMergeSkillGroup(listSkillGroupsAccumulator[0], groupSkill(artifact.skills[1]));
      destructiveMergeSkillGroup(listSkillGroupsAccumulator[1], groupSkill(artifact.skills[2]));
      destructiveMergeSkillGroup(listSkillGroupsAccumulator[2], groupSkill(artifact.skills[3]));

      return listAccumulator;
    }, defaultValue()) ?? defaultValue();

    const pageArtifactAccumulator = pageAccumulator[0];
    const pageArtifactPositionsAccumulator = pageAccumulator[1];
    const pageSkillGroupsAccumulator = pageAccumulator[2];

    pageArtifactAccumulator.push(...artifacts);
    Object.assign(pageArtifactPositionsAccumulator, artifactPositions);
    destructiveMergeSkillGroup(pageSkillGroupsAccumulator[0], skillGroups[0]);
    destructiveMergeSkillGroup(pageSkillGroupsAccumulator[1], skillGroups[1]);
    destructiveMergeSkillGroup(pageSkillGroupsAccumulator[2], skillGroups[2]);

    return pageAccumulator;
  }, defaultValue());

  return result ?? defaultValue();
};
