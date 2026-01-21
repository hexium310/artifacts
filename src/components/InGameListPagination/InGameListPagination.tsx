import { useCallback, useState } from "react";

import { Checkbox } from "@/components/Checkbox";
import { InGameListPaginationButton } from "@/components/InGameListPaginationButton";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC } from "react";

interface InGameListPaginationProps {
  readonly totalCount: number;
  readonly currentPage: number;
  readonly hasUnnecessaryItemPages: number[];
  readonly onClick: (page: number) => void;
}

export const InGameListPagination: FC<InGameListPaginationProps> = ({ totalCount, currentPage, hasUnnecessaryItemPages, onClick }) => {
  const [isAll, setIsAll] = useState(false);

  const handleCheckboxClick: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setIsAll(e.target.checked);
  }, []);

  const pages = isAll ? [...Array<undefined>(totalCount)].map((_, i) => i + 1) : hasUnnecessaryItemPages;

  return (
    <div className={styles.container}>
      <Checkbox
        className={styles.checkbox}
        checked={isAll}
        onChange={handleCheckboxClick}
      >
        すべてのページを表示
      </Checkbox>
      {
        pages.map((page) => (
          <InGameListPaginationButton
            key={page}
            page={page}
            hasUnnecessaryItem={hasUnnecessaryItemPages.includes(page)}
            isCurrentPage={page === currentPage}
            onClick={onClick}
          >
            {page}
          </InGameListPaginationButton>
        ))
      }
    </div>
  );
};
