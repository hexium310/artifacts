import styles from "./styles.module.css";

import type { FC, ReactNode } from "react";

interface FilterBaseProps {
  readonly children: ReactNode;
  readonly legend: string;
  readonly controller?: ReactNode;
}

export const FilterBase: FC<FilterBaseProps> = ({ children, legend, controller }) => {
  return (
    <fieldset className={styles.container}>
      <legend>{legend}</legend>
      {children}
      {controller}
    </fieldset>
  );
};
