import { clsx } from "clsx/lite";

import { ArtifactTableRow as ArtifactTableRowCells } from "@/components/ArtifactTableRow";
import { getElementFromAttribute } from "@/data/elements";
import { getWeaponSpecialtyFromKind } from "@/data/weaponSpecialties";
import { parseSkillId } from "@/utils/parseArtifactHar";

import styles from "./styles.module.css";

import type { FC } from "react";

import type { ElementId } from "@/data/elements";
import type { WeaponSpecialtyId } from "@/data/weaponSpecialties";
import type { Artifact } from "@/types/artifact";

interface ArtifactTableProps {
  artifacts: Artifact[];
  elementFilter: Record<ElementId, boolean>;
  weaponSpecialtyFilter: Record<WeaponSpecialtyId, boolean>;
  skillFilter: string[];
  skillFilterType: string;
}

export const ArtifactTable: FC<ArtifactTableProps> = ({
  artifacts,
  elementFilter,
  weaponSpecialtyFilter,
  skillFilter,
  skillFilterType,
}) => {
  const elementEnableds = Object
    .entries(elementFilter)
    .filter(([, enabled]) => enabled)
    .map(([id]) => id);
  const weaponSpecialtyEnableds = Object
    .entries(weaponSpecialtyFilter)
    .filter(([, enabled]) => enabled)
    .map(([id]) => id);
  const skillFilterSet = new Set(skillFilter);

  const rowStyle = clsx(styles.subgrid, styles.row);

  return (
    <table className={styles.grid}>
      <thead className={styles.subgrid}>
        <tr className={clsx(styles.subgrid, styles.row)}>
          <th>名前</th>
          <th>属性</th>
          <th>武器</th>
          <th>スキル1</th>
          <th>効果量</th>
          <th>スキル2</th>
          <th>効果量</th>
          <th>スキル3</th>
          <th>効果量</th>
          <th>スキル4</th>
          <th>効果量</th>
        </tr>
      </thead>
      <tbody className={styles.subgrid}>
        {
          artifacts
            .values()
            .filter((artifact) => elementEnableds.length === 0
              || elementEnableds.includes(getElementFromAttribute(Number.parseInt(artifact.attribute))?.id ?? ""))
            .filter((artifact) => weaponSpecialtyEnableds.length === 0
              || weaponSpecialtyEnableds.includes(getWeaponSpecialtyFromKind(Number.parseInt(artifact.kind))?.id ?? ""))
            .filter((artifact) => {
              if (skillFilterType !== "filtering") {
                return true;
              }

              const skillIdSet = new Set(artifact.skills.map((v) => parseSkillId(v.skillId)));
              return skillFilter.length === 0 || skillFilterSet.intersection(skillIdSet).size !== 0;
            })
            .map((artifact) => {
              return (
                <tr key={artifact.id} className={rowStyle}>
                  <ArtifactTableRowCells artifact={artifact} skillFilter={skillFilter} shouldMark={skillFilterType === "marking"} />
                </tr>
              );
            })
            .toArray()
        }
      </tbody>
    </table>
  );
};
