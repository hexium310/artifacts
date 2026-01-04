import { FilterController } from "@/components/FilterController";

import type { FC, MouseEventHandler } from "react";

interface WeaponSpecialtyFilterControllerProps {
  onResetButtonClick: MouseEventHandler<HTMLButtonElement>;
}

export const WeaponSpecialtyFilterController: FC<WeaponSpecialtyFilterControllerProps> = ({ onResetButtonClick }) => {
  return (
    <FilterController>
      <li>
        <button>
          rotate
        </button>
      </li>
      <li>
        <button onClick={onResetButtonClick}>
          reset
        </button>
      </li>
    </FilterController>
  );
};
