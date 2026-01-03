import { FilterBase } from "@/components/FilterBase";
import { SkillFilterController } from "@/components/SkillFilterController";

import styles from "./styles.module.css";

import type { FC } from "react";

import type { SkillGroups } from "@/types/skillGroup";

interface SkillFilterProps {
  skillGroups: SkillGroups;
}

export const SkillFilter: FC<SkillFilterProps> = ({ skillGroups }) => {
  return (
    <FilterBase legend="スキル" controller={<SkillFilterController />}>
      <select className={styles.select} id="skillFilter" multiple>
        <optgroup id="skillGroup1" label="⏷スキルグループ I">
          {
            Object.entries(skillGroups[0]).map(([id, name]) => <option key={id} value={id}>{name}</option>)
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
