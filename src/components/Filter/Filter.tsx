import { ElementFilter } from "@/components/ElementFilter";
import { SkillFilter } from "@/components/SkillFilter";
import { WeaponSpecialtyFilter } from "@/components/WeaponSpecialtyFilter";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC } from "react";

import type { SkillGroups } from "@/types/skillGroup";

interface FilterProps {
  skillGroups: SkillGroups;
  skillFilterType: string;
  skillFilterValues: string[];
  handleChangeElementFilter: ChangeEventHandler<HTMLInputElement>;
  handleChangeWeaponSpecialtyFilter: ChangeEventHandler<HTMLInputElement>;
  handleChangeSkillFilter: ChangeEventHandler<HTMLSelectElement>;
  handleChangeSkillFilterType: ChangeEventHandler<HTMLInputElement>;
}

export const Filter: FC<FilterProps> = ({
  skillGroups,
  skillFilterType,
  skillFilterValues,
  handleChangeElementFilter,
  handleChangeWeaponSpecialtyFilter,
  handleChangeSkillFilter,
  handleChangeSkillFilterType,
}) => {
  return (
    <div className={styles.filter}>
      <div>
        <ElementFilter handleChangeElementFilter={handleChangeElementFilter} />
      </div>
      <div>
        <WeaponSpecialtyFilter handleChangeWeaponSpecialtyFilter={handleChangeWeaponSpecialtyFilter} />
      </div>
      <div className={styles.skill}>
        <SkillFilter
          skillGroups={skillGroups}
          skillFilterType={skillFilterType}
          values={skillFilterValues}
          handleChangeSkillFilter={handleChangeSkillFilter}
          handleChangeSkillFilterType={handleChangeSkillFilterType}
        />
      </div>
    </div>
  );
};
