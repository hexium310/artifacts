import { clsx } from "clsx/lite";

import { ElementFilterController } from "@/components/ElementFilterController";
import { FilterBase } from "@/components/FilterBase";
import { elements } from "@/data/elements";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC, MouseEventHandler } from "react";

import type { ElementId } from "@/types/element";

export type ElementFilterStatus = Record<ElementId, boolean>;

interface ElementFilterProps {
  filterStatus: ElementFilterStatus;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onResetButtonClick: MouseEventHandler<HTMLButtonElement>;
}

export const ElementFilter: FC<ElementFilterProps> = ({
  filterStatus,
  onChange,
  onResetButtonClick,
}) => {
  return (
    <FilterBase
      legend="属性"
      controller={(
        <ElementFilterController
          onResetButtonClick={onResetButtonClick}
        />
      )}
    >
      <menu className={styles.list}>
        {
          elements
            .sort((a, b) => a.attribute - b.attribute)
            .map(({ id, text }) => (
              <li key={id}>
                <label className={clsx(styles.label, styles[id])}>
                  <input
                    type="checkbox"
                    autoComplete="off"
                    name="element"
                    value={id}
                    checked={filterStatus[id]}
                    onChange={onChange}
                  />
                  {text}
                </label>
              </li>
            ))
        }
      </menu>
    </FilterBase>
  );
};
