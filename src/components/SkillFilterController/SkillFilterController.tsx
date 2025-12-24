import { FilterController } from "@/components/FilterController";

import styles from "./styles.module.css";

import type { FC } from "react";

export const SkillFilterController: FC = () => {
  return (
    <FilterController>
      <li>
        <label>
          <input type="radio" autoComplete="off" name="skill-filter-type" value="marking" checked />
          強調
        </label>
        <label>
          <input type="radio" autoComplete="off" name="skill-filter-type" value="filtering" />
          絞込
        </label>
      </li>
      <li className={styles.last}>
        <button>
          reset
        </button>
      </li>
    </FilterController>
  );
};
