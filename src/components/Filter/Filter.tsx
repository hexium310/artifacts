import { useCallback } from "react";

import { ElementFilter } from "@/components/ElementFilter";
import { SkillFilter } from "@/components/SkillFilter";
import { WeaponSpecialtyFilter } from "@/components/WeaponSpecialtyFilter";

import styles from "./styles.module.css";

import type { FC } from "react";

import type { ElementFilterStatus, Filters, WeaponSpecialtyFilterStatus } from "@/data/filter";
import type { ParseArtifactHarResult } from "@/utils/parseArtifactHar";

interface FilterProps {
  readonly dataPromise: Promise<ParseArtifactHarResult> | null;
  readonly onFilterChange: (callback: (filter: Filters) => Filters) => void;
}

export const Filter: FC<FilterProps> = ({ dataPromise, onFilterChange }) => {
  const handleElementFilterStatusChange = useCallback((element: ElementFilterStatus): void => {
    onFilterChange((v) => ({
      ...v,
      element,
    } satisfies Filters));
  }, [onFilterChange]);

  const handleWeaponSpecialtyFilterStatusChange = useCallback((weaponSpecialty: WeaponSpecialtyFilterStatus): void => {
    onFilterChange((v) => ({
      ...v,
      weaponSpecialty,
    } satisfies Filters));
  }, [onFilterChange]);

  const handleSkillFilterChange = useCallback((values: string[]): void => {
    onFilterChange((v) => ({
      ...v,
      skill: {
        ...v.skill,
        values,
      },
    } satisfies Filters));
  }, [onFilterChange]);

  const handleSkillFilterTypeChange = useCallback((filterType: string) => {
    onFilterChange((v) => ({
      ...v,
      skill: {
        ...v.skill,
        filterType,
      },
    } satisfies Filters));
  }, [onFilterChange]);

  return (
    <>
      <div className={styles.filter}>
        <div>
          <ElementFilter onChange={handleElementFilterStatusChange} />
        </div>
        <div>
          <WeaponSpecialtyFilter onChange={handleWeaponSpecialtyFilterStatusChange} />
        </div>
        <div className={styles.skill}>
          <SkillFilter
            dataPromise={dataPromise}
            onChange={handleSkillFilterChange}
            onFilterTypeChange={handleSkillFilterTypeChange}
          />
        </div>
      </div>
    </>
  );
};
