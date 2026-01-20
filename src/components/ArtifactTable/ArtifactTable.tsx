import { clsx } from "clsx/lite";
import { Suspense } from "react";

import { ArtifactTableBody } from "@/components/ArtifactTableBody";

import styles from "./styles.module.css";

import type { FC, RefObject } from "react";

import type { Filters } from "@/data/filter";
import type { ParseArtifactHarResult } from "@/utils/parseArtifactHar";

interface ArtifactTableProps {
  readonly dataPromise: Promise<ParseArtifactHarResult> | null;
  readonly filters: Filters;
  readonly virtualScrollRef: RefObject<HTMLDivElement | null>;
  readonly unnecessaries: Set<number>;
  readonly onRowClick: (id: number) => void;
}

const rowStyle = clsx(styles.subgrid, styles.row);

export const ArtifactTable: FC<ArtifactTableProps> = ({
  dataPromise,
  filters,
  virtualScrollRef,
  unnecessaries,
  onRowClick,
}) => {
  return (
    <div>
      <table className={styles.grid}>
        <thead className={styles.subgrid}>
          <tr className={rowStyle}>
            <th>不要</th>
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
        <Suspense>
          {
            dataPromise && (
              <ArtifactTableBody
                dataPromise={dataPromise}
                filters={filters}
                virtualScrollRef={virtualScrollRef}
                unnecessaries={unnecessaries}
                onRowClick={onRowClick}
              />
            )
          }
        </Suspense>
      </table>
    </div>
  );
};
