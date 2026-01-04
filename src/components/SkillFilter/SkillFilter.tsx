import { Suspense } from "react";

import { FilterBase } from "@/components/FilterBase";
import { SkillFilterController } from "@/components/SkillFilterController";
import { SkillFilterOptions } from "@/components/SkillFilterOptions";

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
        <optgroup id="skillGroup1" label="⏷スキルグループ I">
          <Suspense>
            { dataPromise && <SkillFilterOptions dataPromise={dataPromise} group={1} /> }
          </Suspense>
        </optgroup>
        <optgroup id="skillGroup2" label="⏷スキルグループ II">
          <Suspense>
            { dataPromise && <SkillFilterOptions dataPromise={dataPromise} group={2} /> }
          </Suspense>
        </optgroup>
        <optgroup id="skillGroup3" label="⏷スキルグループ III">
          <Suspense>
            { dataPromise && <SkillFilterOptions dataPromise={dataPromise} group={3} /> }
          </Suspense>
        </optgroup>
      </select>
    </FilterBase>
  );
};
