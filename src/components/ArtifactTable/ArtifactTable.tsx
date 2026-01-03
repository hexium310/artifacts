import { clsx } from "clsx/lite";

import { ArtifactTableRow as ArtifactTableRowCells } from "@/components/ArtifactTableRow";

import styles from "./styles.module.css";

import type { FC } from "react";

import type { Artifact } from "@/types/artifact";

interface ArtifactTableProps {
  artifacts: Artifact[];
}

export const ArtifactTable: FC<ArtifactTableProps> = ({ artifacts }) => {
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
