import { useCallback, useState } from "react";

import { FilterController } from "@/components/FilterController";
import { RadioButton } from "@/components/RadioButton";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC, MouseEventHandler } from "react";

interface SkillFilterControllerProps {
  readonly onFilterTypeChange: (filterType: string) => void;
  readonly onResetButtonClick: MouseEventHandler<HTMLButtonElement>;
}

export const SkillFilterController: FC<SkillFilterControllerProps> = ({
  onFilterTypeChange,
  onResetButtonClick,
}) => {
  const [skillFilterType, setSkillFilterType] = useState<string>("marking");

  const handleSkillFilterTypeChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { value } = e.target;

    setSkillFilterType(value);
    onFilterTypeChange(value);
  }, [onFilterTypeChange]);

  return (
    <FilterController>
      <li>
        <RadioButton value="marking" checked={skillFilterType === "marking"} onChange={handleSkillFilterTypeChange}>
          強調
        </RadioButton>
        <RadioButton value="filtering" checked={skillFilterType === "filtering"} onChange={handleSkillFilterTypeChange}>
          絞込
        </RadioButton>
      </li>
      <li className={styles.last}>
        <button onClick={onResetButtonClick}>
          reset
        </button>
      </li>
    </FilterController>
  );
};
