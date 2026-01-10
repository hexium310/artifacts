import { useCallback, useState } from "react";

import { FilterBase } from "@/components/FilterBase";
import { SkillFilterController } from "@/components/SkillFilterController";
import { SkillFilterOptgroup } from "@/components/SkillFilterOptions";
import { skillFilterDefault } from "@/data/filter";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC, MouseEventHandler } from "react";

import type { ParseArtifactHarResult } from "@/utils/parseArtifactHar";

interface SkillFilterProps {
  dataPromise: Promise<ParseArtifactHarResult> | null;
  onChange: (values: string[]) => void;
  onFilterTypeChange: (filterType: string) => void;
}

const skillGroupNumbers = [1, 2, 3] as const;

export const SkillFilter: FC<SkillFilterProps> = ({
  dataPromise,
  onChange,
  onFilterTypeChange,
}) => {
  const [filterValues, setFilterValues] = useState<string[]>(skillFilterDefault);

  const handleResetButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setFilterValues(skillFilterDefault);
    onChange(skillFilterDefault);
  }, [onChange]);

  const handleFilterValuesChange: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
    const options = [...e.target.selectedOptions];
    const values = options.map((option) => option.value);

    setFilterValues(values);
    onChange(values);
  }, [onChange]);

  return (
    <FilterBase
      legend="スキル"
      controller={(
        <SkillFilterController
          onFilterTypeChange={onFilterTypeChange}
          onResetButtonClick={handleResetButtonClick}
        />
      )}
    >
      <select className={styles.select} id="skillFilter" multiple value={filterValues} onChange={handleFilterValuesChange}>
        {skillGroupNumbers.map((group) => <SkillFilterOptgroup key={group} dataPromise={dataPromise} group={group} />)}
      </select>
    </FilterBase>
  );
};
