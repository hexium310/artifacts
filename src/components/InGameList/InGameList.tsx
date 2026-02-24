import { clsx } from "clsx/lite";

import styles from "./styles.module.css";

import type { FC } from "react";

interface InGameListProps {
  readonly list: boolean[];
}

export const InGameList: FC<InGameListProps> = ({ list }) => {
  return (
    <div className={styles.container}>
      {
        list.map((isUnnecessary, i) => (
          <div key={i} className={clsx(styles.item, isUnnecessary && styles.unnecessary)}></div>
        ))
      }
    </div>
  );
};
