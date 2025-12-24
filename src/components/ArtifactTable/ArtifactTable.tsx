import { clsx } from "clsx/lite";

import { ArtifactTableRow as ArtifactTableRowCells } from "@/components/ArtifactTableRow";

import styles from "./styles.module.css";

import type { FC } from "react";
import type { PartialDeep } from "type-fest";

import type { Page } from "@/types/artifact";

interface ArtifactTableProps {
  artifactPages: PartialDeep<Page>[];
}

export const ArtifactTable: FC<ArtifactTableProps> = ({ artifactPages }) => {
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
          artifactPages
            .map((data) => data.list?.map((artifact) => {
              return (
                <tr key={artifact.id} className={[styles.subgrid, styles.row].join(" ")}>
                  <ArtifactTableRowCells artifact={artifact} />
                </tr>
              );
            }))
            .flat()
        }
      </tbody>
    </table>
  );
};
