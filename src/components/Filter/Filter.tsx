import { ElementFilter } from "@/components/ElementFilter";
import { SkillFilter } from "@/components/SkillFilter";
import { WeaponSpecialtyFilter } from "@/components/WeaponSpecialtyFilter";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC } from "react";

import type { SkillGroups } from "@/types/skillGroup";

interface FilterProps {
  skillGroups: SkillGroups;
  handleChangeElementFilter: ChangeEventHandler<HTMLInputElement>;
  handleChangeWeaponSpecialtyFilter: ChangeEventHandler<HTMLInputElement>;
}

export const Filter: FC<FilterProps> = ({ skillGroups, handleChangeElementFilter, handleChangeWeaponSpecialtyFilter }) => {
  return (
    <div className={styles.filter}>
      <div>
        <ElementFilter handleChangeElementFilter={handleChangeElementFilter} />
      </div>
      <div>
        <WeaponSpecialtyFilter handleChangeWeaponSpecialtyFilter={handleChangeWeaponSpecialtyFilter} />
      </div>
      <div className={styles.skill}>
        <SkillFilter skillGroups={skillGroups} />
      </div>
    </div>
  );
};
