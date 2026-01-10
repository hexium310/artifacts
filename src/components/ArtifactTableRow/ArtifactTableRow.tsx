import { clsx } from "clsx/lite";
import { use } from "react";

import { ArtifactTableSkillCells } from "@/components/ArtifactTableSkillCells";

import styles from "./styles.module.css";

import type { FC } from "react";

import type { ElementFilterStatus, WeaponSpecialtyFilterStatus } from "@/data/filter";
import type { ParseArtifactHarResult } from "@/utils/parseArtifactHar";

interface ArtifactTableRowProps {
  readonly dataPromise: Promise<ParseArtifactHarResult>;
  readonly elementFilter: ElementFilterStatus;
  readonly weaponSpecialtyFilter: WeaponSpecialtyFilterStatus;
  readonly skillFilter: readonly string[];
  readonly skillFilterType: string;
}

const rowStyle = clsx(styles.subgrid, styles.row);

export const ArtifactTableRow: FC<ArtifactTableRowProps> = ({
  dataPromise,
  elementFilter,
  weaponSpecialtyFilter,
  skillFilter,
  skillFilterType,
}) => {
  const [artifacts] = use(dataPromise);

  const elementEnableds = Object
    .entries(elementFilter)
    .filter(([, enabled]) => enabled)
    .map(([id]) => id);
  const weaponSpecialtyEnableds = Object
    .entries(weaponSpecialtyFilter)
    .filter(([, enabled]) => enabled)
    .map(([id]) => id);
  const skillFilterSet = new Set(skillFilter);

  return (
    <>
      {
        artifacts
          .values()
          .filter((artifact) => elementEnableds.length === 0 || elementEnableds.includes(artifact.element.id))
          .filter((artifact) => weaponSpecialtyEnableds.length === 0 || weaponSpecialtyEnableds.includes(artifact.weaponSpecialty.id))
          .filter((artifact) => {
            if (skillFilterType !== "filtering") {
              return true;
            }

            const skillIdSet = new Set(artifact.skills.map((v) => v.id));
            return skillFilter.length === 0 || skillFilterSet.intersection(skillIdSet).size !== 0;
          })
          .map((artifact) => {
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
              <tr key={artifact.id} className={rowStyle}>
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
                  skills.map((skill) => (
                    <ArtifactTableSkillCells
                      key={skill.id}
                      skill={skill}
                      skillFilter={skillFilter}
                      shouldMark={skillFilterType === "marking"}
                    />
                  ))
                }
              </tr>
            );
          })
          .toArray()
      }
    </>
  );
};
