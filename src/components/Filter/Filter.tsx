import { ElementFilter } from "@/components/ElementFilter";
import { SkillFilter } from "@/components/SkillFilter";
import { WeaponSpecialtyFilter } from "@/components/WeaponSpecialtyFilter";

import styles from "./styles.module.css";

import type { FC } from "react";

export const Filter: FC = () => {
  return (
    <div className={styles.filter}>
      <div>
        <ElementFilter />
      </div>
      <div>
        <WeaponSpecialtyFilter />
      </div>
      <div className={styles.skill}>
        <SkillFilter />
      </div>
    </div>
  );
};
