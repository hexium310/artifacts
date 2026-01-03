import { ElementFilter } from "@/components/ElementFilter";
import { SkillFilter } from "@/components/SkillFilter";
import { WeaponSpecialtyFilter } from "@/components/WeaponSpecialtyFilter";

import styles from "./styles.module.css";

import type { FC } from "react";
import type { SkillGroups } from "@/types/skillGroup";

interface FilterProps {
  skillGroups: SkillGroups;
}

export const Filter: FC<FilterProps> = ({ skillGroups }) => {
  return (
    <div className={styles.filter}>
      <div>
        <ElementFilter />
      </div>
      <div>
        <WeaponSpecialtyFilter />
      </div>
      <div className={styles.skill}>
        <SkillFilter skillGroups={skillGroups} />
      </div>
    </div>
  );
};
