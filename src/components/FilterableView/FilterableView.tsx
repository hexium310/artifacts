import { Suspense, useCallback, useState } from "react";

import { ArtifactTable } from "@/components/ArtifactTable";
import { ElementFilter } from "@/components/ElementFilter";
import { SkillFilter } from "@/components/SkillFilter";
import { WeaponSpecialtyFilter } from "@/components/WeaponSpecialtyFilter";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC, MouseEventHandler } from "react";

import type { ElementFilterStatus } from "@/components/ElementFilter/ElementFilter";
import type { WeaponSpecialtyFilterStatus } from "@/components/WeaponSpecialtyFilter/WeaponSpecialtyFilter";
import type { ParseArtifactHarResult } from "@/utils/parseArtifactHar";

interface FilterableViewProps {
  dataPromise: Promise<ParseArtifactHarResult> | null;
}

const elmentFilterDefault = {
  fire: false,
  water: false,
  earth: false,
  wind: false,
  light: false,
  dark: false,
};

const weaponSpecialtyFilterDefault = {
  sabre: false,
  dagger: false,
  spear: false,
  axe: false,
  staff: false,
  gun: false,
  melee: false,
  bow: false,
  harp: false,
  katana: false,
};

const skillFilterDefault = [] satisfies string[];

export const FilterableView: FC<FilterableViewProps> = ({ dataPromise }) => {
  const [elementFilterStatus, setElementFilter] = useState<ElementFilterStatus>(elmentFilterDefault);
  const [weaponSpecialtyFilterStatus, setWeaponSpecialtyFilter] = useState<WeaponSpecialtyFilterStatus>(weaponSpecialtyFilterDefault);
  const [skillFilterValues, setSkillFilter] = useState<string[]>(skillFilterDefault);
  const [skillFilterType, setSkillFilterType] = useState<string>("marking");

  const handleElementFilterChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { checked, value } = e.target;

    setElementFilter((v) => ({
      ...v,
      [value]: checked,
    }));
  }, []);

  const handleWeaponSpecialtyFilterChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { checked, value } = e.target;

    setWeaponSpecialtyFilter((v) => ({
      ...v,
      [value]: checked,
    }));
  }, []);

  const handleSkillFilterChange: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
    const options = [...e.target.selectedOptions];
    const values = options.map((option) => option.value);
    setSkillFilter(values);
  }, []);

  const handleSkillFilterTypeChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setSkillFilterType(e.target.value);
  }, []);

  const handleElementFilterResetButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setElementFilter(elmentFilterDefault);
  }, []);

  const handleWeaponSpecialtyFilterResetButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setWeaponSpecialtyFilter(weaponSpecialtyFilterDefault);
  }, []);

  const handleSkillFilterResetButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setSkillFilter(skillFilterDefault);
  }, []);

  return (
    <>
      <section>
        <div className={styles.filter}>
          <div>
            <ElementFilter
              filterStatus={elementFilterStatus}
              onChange={handleElementFilterChange}
              onResetButtonClick={handleElementFilterResetButtonClick}
            />
          </div>
          <div>
            <WeaponSpecialtyFilter
              filterStatus={weaponSpecialtyFilterStatus}
              onChange={handleWeaponSpecialtyFilterChange}
              onResetButtonClick={handleWeaponSpecialtyFilterResetButtonClick}
            />
          </div>
          <div className={styles.skill}>
            <Suspense>
              <SkillFilter
                dataPromise={dataPromise}
                skillFilterType={skillFilterType}
                filterValues={skillFilterValues}
                onChange={handleSkillFilterChange}
                onSkillFilterTypeChange={handleSkillFilterTypeChange}
                onResetButtonClick={handleSkillFilterResetButtonClick}
              />
            </Suspense>
          </div>
        </div>
      </section>

      <main>
        <ArtifactTable
          dataPromise={dataPromise}
          elementFilterStatus={elementFilterStatus}
          weaponSpecialtyFilterStatus={weaponSpecialtyFilterStatus}
          skillFilterValues={skillFilterValues}
          skillFilterType={skillFilterType}
        />
      </main>
    </>
  );
};
