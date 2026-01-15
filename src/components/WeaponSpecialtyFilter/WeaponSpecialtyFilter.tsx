import { useCallback, useState } from "react";

import { Checkbox } from "@/components/Checkbox";
import { FilterBase } from "@/components/FilterBase";
import { WeaponSpecialtyFilterController } from "@/components/WeaponSpecialtyFilterController";
import { weaponSpecialtyFilterDefault } from "@/data/filter";
import { weaponSpecialties } from "@/data/weaponSpecialties";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC, MouseEventHandler } from "react";

import type { WeaponSpecialtyFilterStatus } from "@/data/filter";

interface WeaponSpecialtyFilterProps {
  readonly onChange: (WeaponSpecialty: WeaponSpecialtyFilterStatus) => void;
}

const sortedWeaponSpecialties = weaponSpecialties.sort((a, b) => a.kind - b.kind);

export const WeaponSpecialtyFilter: FC<WeaponSpecialtyFilterProps> = ({ onChange }) => {
  const [filterStatus, setFilterStatus] = useState<WeaponSpecialtyFilterStatus>(weaponSpecialtyFilterDefault);

  const handleResetButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setFilterStatus(weaponSpecialtyFilterDefault);
    onChange(weaponSpecialtyFilterDefault);
  }, [onChange]);

  const handleFilterStatusChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { checked, value } = e.target;

    setFilterStatus((v) => {
      const newValue = { ...v, [value]: checked };
      onChange(newValue);

      return newValue;
    });
  }, [onChange]);

  return (
    <FilterBase
      legend="武器"
      controller={(
        <WeaponSpecialtyFilterController
          onResetButtonClick={handleResetButtonClick}
        />
      )}
    >
      <menu className={styles.list}>
        {
          sortedWeaponSpecialties.map(({ id, text }) => (
            <li key={id} className={styles.item}>
              <Checkbox value={id} checked={filterStatus[id]} onChange={handleFilterStatusChange}>
                {text}
              </Checkbox>
            </li>
          ))
        }
      </menu>
    </FilterBase>
  );
};
