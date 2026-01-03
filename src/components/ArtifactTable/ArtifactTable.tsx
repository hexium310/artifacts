import { clsx } from "clsx/lite";

import { ArtifactTableRow as ArtifactTableRowCells } from "@/components/ArtifactTableRow";
import { getElementFromAttribute } from "@/data/elements";
import { getWeaponSpecialtyFromKind } from "@/data/weaponSpecialties";

import styles from "./styles.module.css";

import type { FC } from "react";

import type { ElementId } from "@/data/elements";
import type { WeaponSpecialtyId } from "@/data/weaponSpecialties";
import type { Artifact } from "@/types/artifact";

interface ArtifactTableProps {
  artifacts: Artifact[];
  elementFilter: Record<ElementId, boolean>;
  weaponSpecialtyFilter: Record<WeaponSpecialtyId, boolean>;
}

export const ArtifactTable: FC<ArtifactTableProps> = ({ artifacts, elementFilter, weaponSpecialtyFilter }) => {
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
            .filter((artifact) => {
              const enableds = Object
                .entries(elementFilter)
                .filter(([, enabled]) => enabled)
                .map(([id]) => id);
              if (enableds.length === 0) {
                return true;
              }
              return enableds.includes(getElementFromAttribute(Number.parseInt(artifact.attribute))?.id ?? "");
            })
            .filter((artifact) => {
              const enableds = Object
                .entries(weaponSpecialtyFilter)
                .filter(([, enabled]) => enabled)
                .map(([id]) => id);
              if (enableds.length === 0) {
                return true;
              }
              return enableds.includes(getWeaponSpecialtyFromKind(Number.parseInt(artifact.kind))?.id ?? "");
            })
            .map((artifact) => {
              return (
                <tr key={artifact.id} className={[styles.subgrid, styles.row].join(" ")}>
                  <ArtifactTableRowCells artifact={artifact} />
                </tr>
              );
            })
        }
      </tbody>
    </table>
  );
};
