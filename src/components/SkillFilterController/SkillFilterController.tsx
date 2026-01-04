import { FilterController } from "@/components/FilterController";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC, MouseEventHandler } from "react";

interface SkillFilterControllerProps {
  skillFilterType: string;
  onSkillFilterTypeChange: ChangeEventHandler<HTMLInputElement>;
  onResetButtonClick: MouseEventHandler<HTMLButtonElement>;
}

export const SkillFilterController: FC<SkillFilterControllerProps> = ({
  skillFilterType,
  onSkillFilterTypeChange,
  onResetButtonClick,
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
            onChange={onSkillFilterTypeChange}
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
            onChange={onSkillFilterTypeChange}
          />
          絞込
        </label>
      </li>
      <li className={styles.last}>
        <button onClick={onResetButtonClick}>
          reset
        </button>
      </li>
    </FilterController>
  );
};
