import { clsx } from "clsx/lite";
import { Suspense } from "react";

import { ArtifactTableRow } from "@/components/ArtifactTableRow";

import styles from "./styles.module.css";

import type { FC } from "react";

import type { ElementId } from "@/types/element";
import type { WeaponSpecialtyId } from "@/types/weaponSpecialty";
import type { ParseArtifactHarResult } from "@/utils/parseArtifactHar";

interface ArtifactTableProps {
  dataPromise: Promise<ParseArtifactHarResult> | null;
  elementFilterStatus: Record<ElementId, boolean>;
  weaponSpecialtyFilterStatus: Record<WeaponSpecialtyId, boolean>;
  skillFilterValues: string[];
  skillFilterType: string;
}

const rowStyle = clsx(styles.subgrid, styles.row);

export const ArtifactTable: FC<ArtifactTableProps> = ({
  dataPromise,
  elementFilterStatus: elementFilter,
  weaponSpecialtyFilterStatus: weaponSpecialtyFilter,
  skillFilterValues: skillFilter,
  skillFilterType,
}) => {
  return (
    <table className={styles.grid}>
      <thead className={styles.subgrid}>
        <tr className={rowStyle}>
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
        <Suspense>
          {
            dataPromise && (
              <ArtifactTableRow
                dataPromise={dataPromise}
                elementFilter={elementFilter}
                weaponSpecialtyFilter={weaponSpecialtyFilter}
                skillFilter={skillFilter}
                skillFilterType={skillFilterType}
              />
            )
          }
        </Suspense>
      </tbody>
    </table>
  );
};
