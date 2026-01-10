import { useCallback, useState } from "react";

import { Checkbox } from "@/components/Checkbox";
import { ElementFilterController } from "@/components/ElementFilterController";
import { FilterBase } from "@/components/FilterBase";
import { elements } from "@/data/elements";
import { elmentFilterDefault } from "@/data/filter";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC, MouseEventHandler } from "react";

import type { ElementFilterStatus } from "@/data/filter";

interface ElementFilterProps {
  onChange: (element: ElementFilterStatus) => void;
}

const sortedElements = elements.sort((a, b) => a.attribute - b.attribute);

export const ElementFilter: FC<ElementFilterProps> = ({ onChange }) => {
  const [filterStatus, setFilterStatus] = useState<ElementFilterStatus>(elmentFilterDefault);

  const handleResetButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setFilterStatus(elmentFilterDefault);
    onChange(elmentFilterDefault);
  }, [onChange]);

  const handleFilterStatusChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { checked, value } = e.target;

    setFilterStatus((v) => {
      const newValue = { ...v, [value]: checked };
      onChange(newValue);

      return newValue;
    });
  }, [onChange]);

  return (
    <FilterBase
      legend="属性"
      controller={(
        <ElementFilterController
          onResetButtonClick={handleResetButtonClick}
        />
      )}
    >
      <menu className={styles.list}>
        {
          sortedElements.map(({ id, text }) => (
            <li key={id}>
              <Checkbox className={styles[id]} value={id} checked={filterStatus[id]} onChange={handleFilterStatusChange}>
                {text}
              </Checkbox>
            </li>
          ))
        }
      </menu>
    </FilterBase>
  );
};
