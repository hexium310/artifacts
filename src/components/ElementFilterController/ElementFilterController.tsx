import { FilterController } from "@/components/FilterController";

import type { FC, MouseEventHandler } from "react";

interface ElementFilterControllerProps {
  readonly onResetButtonClick: MouseEventHandler<HTMLButtonElement>;
}

export const ElementFilterController: FC<ElementFilterControllerProps> = ({ onResetButtonClick }) => {
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
