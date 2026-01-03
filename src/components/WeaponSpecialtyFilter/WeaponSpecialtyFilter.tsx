import { FilterBase } from "@/components/FilterBase";
import { WeaponSpecialtyFilterController } from "@/components/WeaponSpecialtyFilterController";
import { weaponSpecialties } from "@/data/weaponSpecialties";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC, MouseEventHandler } from "react";

import type { WeaponSpecialtyId } from "@/data/weaponSpecialties";

interface WeaponSpecialtyFilterProps {
  weaponSpecialtyFilter: Record<WeaponSpecialtyId, boolean>;
  handleChangeWeaponSpecialtyFilter: ChangeEventHandler<HTMLInputElement>;
  handleClickWeaponSpecialtyFilterControllerReset: MouseEventHandler<HTMLButtonElement>;
}

export const WeaponSpecialtyFilter: FC<WeaponSpecialtyFilterProps> = ({
  weaponSpecialtyFilter,
  handleChangeWeaponSpecialtyFilter,
  handleClickWeaponSpecialtyFilterControllerReset,
}) => {
  const weaponSpecialtyListItems = weaponSpecialties
    .sort((a, b) => a.kind - b.kind)
    .map(({ id, text }) => (
      <li key={id} className={styles.item}>
        <label className={styles.label}>
          <input
            type="checkbox"
            autoComplete="off"
            name="element"
            value={id}
            checked={weaponSpecialtyFilter[id]}
            onChange={handleChangeWeaponSpecialtyFilter}
          />
          {text}
        </label>
      </li>
    ));

  return (
    <FilterBase legend="武器" controller={<WeaponSpecialtyFilterController handleClickWeaponSpecialtyFilterControllerReset={handleClickWeaponSpecialtyFilterControllerReset} />}>
      <menu className={styles.list}>
        {weaponSpecialtyListItems}
      </menu>
    </FilterBase>
  );
};
