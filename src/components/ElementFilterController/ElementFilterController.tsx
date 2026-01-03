import { FilterController } from "@/components/FilterController";

import type { FC, MouseEventHandler } from "react";

interface ElementFilterControllerProps {
  handleClickElementFilterControllerReset: MouseEventHandler<HTMLButtonElement>;
}

export const ElementFilterController: FC<ElementFilterControllerProps> = ({ handleClickElementFilterControllerReset }) => {
  return (
    <FilterController>
      <li>
        <button>
          rotate
        </button>
      </li>
      <li>
        <button onClick={handleClickElementFilterControllerReset}>
          reset
        </button>
      </li>
    </FilterController>
  );
};
