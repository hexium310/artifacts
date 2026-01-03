import { clsx } from "clsx/lite";

import styles from "./styles.module.css";

import type { FC } from "react";

import type { Skill } from "@/types/artifact";

interface ArtifactTableSkillCellsProps {
  skill: Skill;
  skillFilter: string[];
  shouldMark: boolean;
}

export const ArtifactTableSkillCells: FC<ArtifactTableSkillCellsProps> = ({ skill, skillFilter, shouldMark }) => {
  const {
    id,
    name,
    effectValue,
    isMaxQuality,
  } = skill;

  return (
    <>
      <td className={clsx(shouldMark && skillFilter.includes(id) && styles.marking)}>
        {name}
      </td>
      <td className={clsx(isMaxQuality && styles.maxQuality)}>
        {effectValue}
      </td>
    </>
  );
};
