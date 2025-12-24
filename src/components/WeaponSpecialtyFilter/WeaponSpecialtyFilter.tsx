import { FilterBase } from "@/components/FilterBase";
import { WeaponSpecialtyFilterController } from "@/components/WeaponSpecialtyFilterController";
import { weaponSpecialties } from "@/data/weaponSpecialties";

import styles from "./styles.module.css";

import type { FC } from "react";

export const WeaponSpecialtyFilter: FC = () => {
  const weaponSpecialtyListItems = weaponSpecialties
    .sort((a, b) => a.kind - b.kind)
    .map(({ kind, text }) => (
      <li key={kind} className={styles.item}>
        <label className={styles.label}>
          <input type="checkbox" autoComplete="off" name="element" value={text} />
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
