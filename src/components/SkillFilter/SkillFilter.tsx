import { FilterBase } from "@/components/FilterBase";
import { SkillFilterController } from "@/components/SkillFilterController";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC, MouseEventHandler } from "react";

import type { SkillGroups } from "@/types/skillGroup";

interface SkillFilterProps {
  skillGroups: SkillGroups;
  skillFilterType: string;
  values: string[];
  handleChangeSkillFilter: ChangeEventHandler<HTMLSelectElement>;
  handleChangeSkillFilterType: ChangeEventHandler<HTMLInputElement>;
  handleClickSkillFilterControllerReset: MouseEventHandler<HTMLButtonElement>;
}

export const SkillFilter: FC<SkillFilterProps> = ({
  skillGroups,
  skillFilterType,
  values,
  handleChangeSkillFilter,
  handleChangeSkillFilterType,
  handleClickSkillFilterControllerReset,
}) => {
  return (
    <FilterBase
      legend="スキル"
      controller={<SkillFilterController skillFilterType={skillFilterType} handleChangeSkillFilterType={handleChangeSkillFilterType} handleClickSkillFilterControllerReset={handleClickSkillFilterControllerReset} />}
    >
      <select className={styles.select} id="skillFilter" multiple value={values} onChange={handleChangeSkillFilter}>
        <optgroup id="skillGroup1" label="⏷スキルグループ I">
          {
            Object.entries(skillGroups[0]).map(([id, name]) => <option key={id} value={id} data-skill-group="1">{name}</option>)
          }
        </optgroup>
        <optgroup id="skillGroup2" label="⏷スキルグループ II">
          {
            Object.entries(skillGroups[1]).map(([id, name]) => <option key={id} value={id}>{name}</option>)
          }
        </optgroup>
        <optgroup id="skillGroup3" label="⏷スキルグループ III">
          {
            Object.entries(skillGroups[2]).map(([id, name]) => <option key={id} value={id}>{name}</option>)
          }
        </optgroup>
      </select>
    </FilterBase>
  );
};
