import styles from "./styles.module.css";

import type { FC, ReactNode } from "react";

interface FilterControllerProps {
  children: ReactNode;
}

export const FilterController: FC<FilterControllerProps> = ({ children }) => {
  return (
    <menu className={styles.container}>
      {children}
    </menu>
  );
};
