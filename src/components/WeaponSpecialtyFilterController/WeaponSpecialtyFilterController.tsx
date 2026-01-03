import { FilterController } from "@/components/FilterController";

import type { FC, MouseEventHandler } from "react";

interface WeaponSpecialtyFilterControllerProps {
  handleClickWeaponSpecialtyFilterControllerReset: MouseEventHandler<HTMLButtonElement>;
}

export const WeaponSpecialtyFilterController: FC<WeaponSpecialtyFilterControllerProps> = ({ handleClickWeaponSpecialtyFilterControllerReset }) => {
  return (
    <FilterController>
      <li>
        <button>
          rotate
        </button>
      </li>
      <li>
        <button onClick={handleClickWeaponSpecialtyFilterControllerReset}>
          reset
        </button>
      </li>
    </FilterController>
  );
};
