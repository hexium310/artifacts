import { clsx } from "clsx/lite";

import { ArtifactTableSkillCells } from "@/components/ArtifactTableSkillCells";
import { getElementFromAttribute } from "@/data/elements";
import { getWeaponSpecialtyFromKind } from "@/data/weaponSpecialties";

import styles from "./styles.module.css";

import type { FC } from "react";

import type { Artifact } from "@/types/artifact";

interface ArtifactTableRowProps {
  artifact: Artifact;
}

export const ArtifactTableRow: FC<ArtifactTableRowProps> = ({ artifact }) => {
  const {
    name,
    attribute,
    kind,
    skill1Info,
    skill2Info,
    skill3Info,
    skill4Info,
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
      <ArtifactTableSkillCells skill={skill1Info} />
      <ArtifactTableSkillCells skill={skill2Info} />
      <ArtifactTableSkillCells skill={skill3Info} />
      <ArtifactTableSkillCells skill={skill4Info} />
    </>
  );
};
