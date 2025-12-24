import { clsx } from "clsx/lite";

import styles from "./styles.module.css";

import type { FC } from "react";

import type { Skill } from "@/types/artifact";

interface ArtifactTableSkillCellsProps {
  skill: Skill;
}

export const ArtifactTableSkillCells: FC<ArtifactTableSkillCellsProps> = ({ skill }) => {
  const {
    name,
    effectValue,
    isMaxQuality,
  } = skill;

  return (
    <>
      <td>
        {name}
      </td>
      <td className={clsx(isMaxQuality && styles.maxQuality)}>
        {effectValue}
      </td>
    </>
  );
};
