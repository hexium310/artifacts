import { FilterController } from "@/components/FilterController";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC, MouseEventHandler } from "react";

interface SkillFilterControllerProps {
  skillFilterType: string;
  handleChangeSkillFilterType: ChangeEventHandler<HTMLInputElement>;
  handleClickSkillFilterControllerReset: MouseEventHandler<HTMLButtonElement>;
}

export const SkillFilterController: FC<SkillFilterControllerProps> = ({
  skillFilterType,
  handleChangeSkillFilterType,
  handleClickSkillFilterControllerReset,
}) => {
  return (
    <FilterController>
      <li>
        <label>
          <input
            type="radio"
            autoComplete="off"
            name="skill-filter-type"
            value="marking"
            checked={skillFilterType === "marking"}
            onChange={handleChangeSkillFilterType}
          />
          強調
        </label>
        <label>
          <input
            type="radio"
            autoComplete="off"
            name="skill-filter-type"
            value="filtering"
            checked={skillFilterType === "filtering"}
            onChange={handleChangeSkillFilterType}
          />
          絞込
        </label>
      </li>
      <li className={styles.last}>
        <button onClick={handleClickSkillFilterControllerReset}>
          reset
        </button>
      </li>
    </FilterController>
  );
};
