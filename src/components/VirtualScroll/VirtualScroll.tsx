import styles from "./styles.module.css";

import type { FC, ReactNode, RefObject } from "react";

interface VirtualScrollProps {
  readonly children: ReactNode;
  readonly virtualScrollRef: RefObject<HTMLDivElement | null>;
}

export const VirtualScroll: FC<VirtualScrollProps> = ({ children, virtualScrollRef }) => {
  return (
    <div className={styles.virtualScroll} ref={virtualScrollRef}>
      {children}
    </div>
  );
};
