import { useVirtualizer } from "@tanstack/react-virtual";
import { clsx } from "clsx/lite";
import { Fragment, use } from "react";

import { ArtifactTableBodyRow } from "@/components/ArtifactTableBodyRow";

import styles from "./styles.module.css";

import type { FC, RefObject } from "react";

import type { Filters } from "@/data/filter";
import type { Skill } from "@/types/artifact";
import type { ParseArtifactHarResult } from "@/utils/parseArtifactHar";

interface ArtifactTableBodyProps {
  readonly dataPromise: Promise<ParseArtifactHarResult>;
  readonly filters: Filters;
  readonly virtualScrollRef: RefObject<HTMLDivElement | null>;
  readonly unnecessaries: Set<number>;
  readonly onRowClick: (id: number) => void;
}

// When the window height is 1106px
const NUMBER_OF_CHARS_EACH_LINE = 9;
const LINE_HEIGHT = 23;

export const ArtifactTableBody: FC<ArtifactTableBodyProps> = ({
  dataPromise,
  filters,
  virtualScrollRef,
  unnecessaries,
  onRowClick,
}) => {
  const [artifacts] = use(dataPromise);

  const elementEnableds = Object
    .entries(filters.element)
    .filter(([, enabled]) => enabled)
    .map(([id]) => id);
  const weaponSpecialtyEnableds = Object
    .entries(filters.weaponSpecialty)
    .filter(([, enabled]) => enabled)
    .map(([id]) => id);
  const skillFilterSet = new Set(filters.skill.values);

  const filteredArtifacts = artifacts
    .values()
    .filter((artifact) => elementEnableds.length === 0 || elementEnableds.includes(artifact.element.id))
    .filter((artifact) => weaponSpecialtyEnableds.length === 0 || weaponSpecialtyEnableds.includes(artifact.weaponSpecialty.id))
    .filter((artifact) => {
      if (filters.skill.filterType !== "filtering") {
        return true;
      }

      const skillIdSet = new Set(artifact.skills.map((v) => v.id));
      return skillFilterSet.size === 0 || skillFilterSet.intersection(skillIdSet).size !== 0;
    })
    .toArray();

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: filteredArtifacts.length,
    // Estimate approximate heights for preventing the scrolling from stopping at the halfway position when pressing the Home or End key.
    estimateSize: (i) => {
      const maxLength = filteredArtifacts[i]
        .skills
        .reduce<Partial<Skill>>((acc, skill) => acc.name && acc.name.length > skill.name.length ? acc : skill, {})
        .name
        ?.length
        ?? 1;

      return Math.ceil(maxLength / NUMBER_OF_CHARS_EACH_LINE) * LINE_HEIGHT;
    },
    getScrollElement: () => virtualScrollRef.current,
    overscan: 5,
  });

  const shouldMark = filters.skill.filterType === "marking";

  return (
    <tbody className={styles.subgrid} style={{ height: `${virtualizer.getTotalSize().toString()}px` }}>
      {
        virtualizer
          .getVirtualItems()
          .map((virtualRow) => {
            const artifact = filteredArtifacts[virtualRow.index];

            return (
              <ArtifactTableBodyRow
                key={artifact.id}
                artifactId={artifact.id}
                className={styles.virtualScrollItem}
                ref={(node) => { virtualizer.measureElement(node); }}
                rowIndex={virtualRow.index}
                rowStart={virtualRow.start.toString()}
                isUnnecessary={unnecessaries.has(artifact.id)}
                renderName={() => <td>{artifact.name}</td>}
                renderElement={() => <td className={styles[artifact.element.id]}>{artifact.element.text}</td>}
                renderWeaponSpecialty={() => <td>{artifact.weaponSpecialty.text}</td>}
                renderSkills={() => artifact.skills.map((skill) => (
                  <Fragment key={skill.id}>
                    <td className={clsx(shouldMark && filters.skill.values.includes(skill.id) && styles.marking)}>
                      {skill.name}
                    </td>
                    <td className={clsx(skill.isMaxQuality && styles.maxQuality)}>
                      {skill.effectValue}
                    </td>
                  </Fragment>
                ))}
                onClick={onRowClick}
              />
            );
          })
      }
    </tbody>
  );
};
