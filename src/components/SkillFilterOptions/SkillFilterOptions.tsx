import { use } from "react";

import type { FC } from "react";

import type { ParseArtifactHarResult } from "@/utils/parseArtifactHar";

interface SkillFilterOptionsProps {
  dataPromise: Promise<ParseArtifactHarResult>;
  group: 1 | 2 | 3;
}

const groupIndex = {
  1: 0,
  2: 1,
  3: 2,
} as const;

export const SkillFilterOptions: FC<SkillFilterOptionsProps> = ({ dataPromise, group }) => {
  const [, skillGroups] = use(dataPromise);

  const skillGroup = skillGroups[groupIndex[group]];

  return (
    <>
      {
        Object.entries(skillGroup).map(([id, name]) => <option key={id} value={id}>{name}</option>)
      }
    </>
  );
};
