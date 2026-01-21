import { clsx } from "clsx/lite";

import styles from "./styles.module.css";

import type { FC, ReactNode, RefObject } from "react";

interface VirtualScrollProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly virtualScrollRef: RefObject<HTMLDivElement | null>;
}

export const VirtualScroll: FC<VirtualScrollProps> = ({ children, className, virtualScrollRef }) => {
  return (
    <div className={clsx(styles.virtualScroll, className)} ref={virtualScrollRef}>
      {children}
    </div>
  );
};
