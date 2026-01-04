import { ArtifactTableSkillCells } from "@/components/ArtifactTableSkillCells";

import styles from "./styles.module.css";

import type { FC } from "react";

import type { Artifact } from "@/types/artifact";

interface ArtifactTableRowProps {
  artifact: Artifact;
  skillFilter: string[];
  shouldMark: boolean;
}

export const ArtifactTableRow: FC<ArtifactTableRowProps> = ({ artifact, skillFilter, shouldMark }) => {
  const {
    name,
    element: {
      id: elementId,
      text: elementText,
    },
    weaponSpecialty: {
      text: weaponSpecialtyText,
    },
    skills,
  } = artifact;

  return (
    <>
      <td>
        {name}
      </td>
      <td className={styles[elementId]}>
        {elementText}
      </td>
      <td>
        {weaponSpecialtyText}
      </td>
      {
        skills.map((skill) => <ArtifactTableSkillCells skill={skill} skillFilter={skillFilter} shouldMark={shouldMark} />)
      }
    </>
  );
};
