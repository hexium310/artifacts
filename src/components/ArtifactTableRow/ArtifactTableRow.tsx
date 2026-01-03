import { clsx } from "clsx/lite";

import { ArtifactTableSkillCells } from "@/components/ArtifactTableSkillCells";
import { getElementFromAttribute } from "@/data/elements";
import { getWeaponSpecialtyFromKind } from "@/data/weaponSpecialties";

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
    attribute,
    kind,
    skills,
  } = artifact;

  const {
    text: element,
    id: elementId,
  } = getElementFromAttribute(Number.parseInt(attribute)) ?? {};
  const weaponSpecialty = getWeaponSpecialtyFromKind(Number.parseInt(kind))?.text;

  return (
    <>
      <td>
        {name}
      </td>
      <td className={clsx(elementId && styles[elementId])}>
        {element}
      </td>
      <td>
        {weaponSpecialty}
      </td>
      {
        skills.map((skill) => <ArtifactTableSkillCells skill={skill} skillFilter={skillFilter} shouldMark={shouldMark} />)
      }
    </>
  );
};
