import { clsx } from "clsx/lite";
import { useCallback } from "react";

import styles from "./styles.module.css";

import type { FC, MouseEventHandler, ReactNode } from "react";

interface InGameListPaginationButtonProps {
  readonly children: ReactNode;
  readonly page: number;
  readonly hasUnnecessaryItem: boolean;
  readonly isCurrentPage: boolean;
  readonly onClick: (page: number) => void;
}

export const InGameListPaginationButton: FC<InGameListPaginationButtonProps> = ({
  children,
  page,
  hasUnnecessaryItem,
  isCurrentPage,
  onClick,
}) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    onClick(page);
  }, [page, onClick]);

  return (
    <button
      key={page}
      className={clsx(
        styles.button,
        hasUnnecessaryItem && styles.hasUnnecessaryItem,
        isCurrentPage && styles.currentPage
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
