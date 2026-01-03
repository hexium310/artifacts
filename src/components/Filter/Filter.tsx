import { ElementFilter } from "@/components/ElementFilter";
import { SkillFilter } from "@/components/SkillFilter";
import { WeaponSpecialtyFilter } from "@/components/WeaponSpecialtyFilter";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC, MouseEventHandler } from "react";

import type { ElementId } from "@/data/elements";
import type { WeaponSpecialtyId } from "@/data/weaponSpecialties";
import type { SkillGroups } from "@/types/skillGroup";

interface FilterProps {
  elementFilter: Record<ElementId, boolean>;
  weaponSpecialtyFilter: Record<WeaponSpecialtyId, boolean>;
  skillGroups: SkillGroups;
  skillFilterType: string;
  skillFilterValues: string[];
  handleChangeElementFilter: ChangeEventHandler<HTMLInputElement>;
  handleChangeWeaponSpecialtyFilter: ChangeEventHandler<HTMLInputElement>;
  handleChangeSkillFilter: ChangeEventHandler<HTMLSelectElement>;
  handleChangeSkillFilterType: ChangeEventHandler<HTMLInputElement>;
  handleClickElementFilterControllerReset: MouseEventHandler<HTMLButtonElement>;
  handleClickWeaponSpecialtyFilterControllerReset: MouseEventHandler<HTMLButtonElement>;
  handleClickSkillFilterControllerReset: MouseEventHandler<HTMLButtonElement>;
}

export const Filter: FC<FilterProps> = ({
  elementFilter,
  weaponSpecialtyFilter,
  skillGroups,
  skillFilterType,
  skillFilterValues,
  handleChangeElementFilter,
  handleChangeWeaponSpecialtyFilter,
  handleChangeSkillFilter,
  handleChangeSkillFilterType,
  handleClickElementFilterControllerReset,
  handleClickWeaponSpecialtyFilterControllerReset,
  handleClickSkillFilterControllerReset,
}) => {
  return (
    <div className={styles.filter}>
      <div>
        <ElementFilter
          elementFilter={elementFilter}
          handleChangeElementFilter={handleChangeElementFilter}
          handleClickElementFilterControllerReset={handleClickElementFilterControllerReset}
        />
      </div>
      <div>
        <WeaponSpecialtyFilter
          weaponSpecialtyFilter={weaponSpecialtyFilter}
          handleChangeWeaponSpecialtyFilter={handleChangeWeaponSpecialtyFilter}
          handleClickWeaponSpecialtyFilterControllerReset={handleClickWeaponSpecialtyFilterControllerReset}
        />
      </div>
      <div className={styles.skill}>
        <SkillFilter
          skillGroups={skillGroups}
          skillFilterType={skillFilterType}
          values={skillFilterValues}
          handleChangeSkillFilter={handleChangeSkillFilter}
          handleChangeSkillFilterType={handleChangeSkillFilterType}
          handleClickSkillFilterControllerReset={handleClickSkillFilterControllerReset}
        />
      </div>
    </div>
  );
};
