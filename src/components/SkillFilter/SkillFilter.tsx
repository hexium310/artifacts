import { FilterBase } from "@/components/FilterBase";
import { SkillFilterController } from "@/components/SkillFilterController";

import styles from "./styles.module.css";

import type { FC } from "react";

export const SkillFilter: FC = () => {
  return (
    <FilterBase legend="スキル" controller={<SkillFilterController />}>
      <select className={styles.select} id="skillFilter" multiple>
        <optgroup id="skillGroup1" label="⏷スキルグループ I">
        </optgroup>
        <optgroup id="skillGroup2" label="⏷スキルグループ II">
        </optgroup>
        <optgroup id="skillGroup3" label="⏷スキルグループ III">
        </optgroup>
      </select>
    </FilterBase>
  );
};
