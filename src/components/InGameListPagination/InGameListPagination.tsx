import { useCallback, useState } from "react";

import { Checkbox } from "@/components/Checkbox";
import { InGameListPaginationButton } from "@/components/InGameListPaginationButton";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC } from "react";

interface InGameListPaginationProps {
  readonly currentPage: number;
  readonly pages: [number, boolean][];
  readonly onClick: (page: number) => void;
}

export const InGameListPagination: FC<InGameListPaginationProps> = ({ currentPage, pages, onClick }) => {
  const [isAll, setIsAll] = useState(false);

  const handleCheckboxClick: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setIsAll(e.target.checked);
  }, []);

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
        pages.map(([page, hasUnnecessaryItemPages]) => {
          return isAll || hasUnnecessaryItemPages
            ? (
                <InGameListPaginationButton
                  key={page}
                  page={page}
                  hasUnnecessaryItem={hasUnnecessaryItemPages}
                  isCurrentPage={page === currentPage}
                  onClick={onClick}
                >
                  {page}
                </InGameListPaginationButton>
              )
            : null;
        })
      }
    </div>
  );
};
