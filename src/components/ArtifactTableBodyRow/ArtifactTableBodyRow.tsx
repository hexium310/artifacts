import { clsx } from "clsx/lite";

import { ArtifactTableSkillCells } from "@/components/ArtifactTableSkillCells";

import styles from "./styles.module.css";

import type { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import type { FC } from "react";

import type { Artifact } from "@/types/artifact";

interface ArtifactTableBodyRowProps {
  readonly artifact: Artifact;
  readonly skillFilter: {
    values: readonly string[];
    filterType: string;
  };
  readonly virtualRow: VirtualItem;
  readonly virtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
}

const rowStyle = clsx(styles.subgrid, styles.row, styles.virtualScrollItem);

export const ArtifactTableBodyRow: FC<ArtifactTableBodyRowProps> = ({ artifact, skillFilter, virtualRow, virtualizer }) => {
  return (
    <tr
      key={artifact.id}
      className={rowStyle}
      style={{ transform: `translateY(${virtualRow.start.toString()}px)` }}
      ref={(node) => { virtualizer.measureElement(node); }}
      data-index={virtualRow.index}
    >
      <td>
        {artifact.name}
      </td>
      <td className={styles[artifact.element.id]}>
        {artifact.element.text}
      </td>
      <td>
        {artifact.weaponSpecialty.text}
      </td>
      {
        artifact.skills.map((skill) => (
          <ArtifactTableSkillCells
            key={skill.id}
            skill={skill}
            skillFilter={skillFilter.values}
            shouldMark={skillFilter.filterType === "marking"}
          />
        ))
      }
    </tr>
  );
};
