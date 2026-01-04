import { FilterBase } from "@/components/FilterBase";
import { WeaponSpecialtyFilterController } from "@/components/WeaponSpecialtyFilterController";
import { weaponSpecialties } from "@/data/weaponSpecialties";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC, MouseEventHandler } from "react";

import type { WeaponSpecialtyId } from "@/types/weaponSpecialty";

export type WeaponSpecialtyFilterStatus = Record<WeaponSpecialtyId, boolean>;

interface WeaponSpecialtyFilterProps {
  filterStatus: WeaponSpecialtyFilterStatus;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onResetButtonClick: MouseEventHandler<HTMLButtonElement>;
}

export const WeaponSpecialtyFilter: FC<WeaponSpecialtyFilterProps> = ({
  filterStatus,
  onChange,
  onResetButtonClick,
}) => {
  return (
    <FilterBase
      legend="武器"
      controller={(
        <WeaponSpecialtyFilterController
          onResetButtonClick={onResetButtonClick}
        />
      )}
    >
      <menu className={styles.list}>
        {
          weaponSpecialties
            .sort((a, b) => a.kind - b.kind)
            .map(({ id, text }) => (
              <li key={id} className={styles.item}>
                <label className={styles.label}>
                  <input
                    type="checkbox"
                    autoComplete="off"
                    name="element"
                    value={id}
                    checked={filterStatus[id]}
                    onChange={onChange}
                  />
                  {text}
                </label>
              </li>
            ))
        }
      </menu>
    </FilterBase>
  );
};
