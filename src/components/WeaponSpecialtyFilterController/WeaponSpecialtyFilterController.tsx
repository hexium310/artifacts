import { FilterController } from "@/components/FilterController";

import type { FC } from "react";

export const WeaponSpecialtyFilterController: FC = () => {
  return (
    <FilterController>
      <li>
        <button>
          rotate
        </button>
      </li>
      <li>
        <button>
          reset
        </button>
      </li>
    </FilterController>
  );
};
