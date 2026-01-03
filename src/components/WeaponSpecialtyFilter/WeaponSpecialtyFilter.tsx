import { FilterBase } from "@/components/FilterBase";
import { WeaponSpecialtyFilterController } from "@/components/WeaponSpecialtyFilterController";
import { weaponSpecialties } from "@/data/weaponSpecialties";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC } from "react";

interface WeaponSpecialtyFilterProps {
  handleChangeWeaponSpecialtyFilter: ChangeEventHandler<HTMLInputElement>;
}

export const WeaponSpecialtyFilter: FC<WeaponSpecialtyFilterProps> = ({ handleChangeWeaponSpecialtyFilter }) => {
  const weaponSpecialtyListItems = weaponSpecialties
    .sort((a, b) => a.kind - b.kind)
    .map(({ id, text }) => (
      <li key={id} className={styles.item}>
        <label className={styles.label}>
          <input type="checkbox" autoComplete="off" name="element" value={id} onChange={handleChangeWeaponSpecialtyFilter} />
          {text}
        </label>
      </li>
    ));

  return (
    <FilterBase legend="武器" controller={<WeaponSpecialtyFilterController />}>
      <menu className={styles.list}>
        {weaponSpecialtyListItems}
      </menu>
    </FilterBase>
  );
};
