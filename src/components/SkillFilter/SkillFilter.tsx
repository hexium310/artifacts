import { FilterBase } from "@/components/FilterBase";
import { SkillFilterController } from "@/components/SkillFilterController";
import { SkillFilterOptgroup } from "@/components/SkillFilterOptions";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC, MouseEventHandler } from "react";

import type { ParseArtifactHarResult } from "@/utils/parseArtifactHar";

interface SkillFilterProps {
  dataPromise: Promise<ParseArtifactHarResult> | null;
  skillFilterType: string;
  filterValues: string[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
  onSkillFilterTypeChange: ChangeEventHandler<HTMLInputElement>;
  onResetButtonClick: MouseEventHandler<HTMLButtonElement>;
}

const skillGroupNumbers = [1, 2, 3] as const;

export const SkillFilter: FC<SkillFilterProps> = ({
  dataPromise,
  skillFilterType,
  filterValues,
  onChange,
  onSkillFilterTypeChange,
  onResetButtonClick,
}) => {
  return (
    <FilterBase
      legend="スキル"
      controller={(
        <SkillFilterController
          skillFilterType={skillFilterType}
          onSkillFilterTypeChange={onSkillFilterTypeChange}
          onResetButtonClick={onResetButtonClick}
        />
      )}
    >
      <select className={styles.select} id="skillFilter" multiple value={filterValues} onChange={onChange}>
        {skillGroupNumbers.map((group) => <SkillFilterOptgroup key={group} dataPromise={dataPromise} group={group} />)}
      </select>
    </FilterBase>
  );
};
