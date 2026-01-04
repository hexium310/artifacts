import { clsx } from "clsx/lite";

import { ElementFilterController } from "@/components/ElementFilterController";
import { FilterBase } from "@/components/FilterBase";
import { elements } from "@/data/elements";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC, MouseEventHandler } from "react";

import type { ElementId } from "@/types/element";

interface ElementFilterProps {
  elementFilter: Record<ElementId, boolean>;
  handleChangeElementFilter: ChangeEventHandler<HTMLInputElement>;
  handleClickElementFilterControllerReset: MouseEventHandler<HTMLButtonElement>;
}

export const ElementFilter: FC<ElementFilterProps> = ({ elementFilter, handleChangeElementFilter, handleClickElementFilterControllerReset }) => {
  const elementListItems = elements
    .sort((a, b) => a.attribute - b.attribute)
    .map(({ id, text }) => (
      <li key={id}>
        <label className={clsx(styles.label, styles[id])}>
          <input
            type="checkbox"
            autoComplete="off"
            name="element"
            value={id}
            checked={elementFilter[id]}
            onChange={handleChangeElementFilter}
          />
          {text}
        </label>
      </li>
    ));

  return (
    <FilterBase legend="属性" controller={<ElementFilterController handleClickElementFilterControllerReset={handleClickElementFilterControllerReset} />}>
      <menu className={styles.list}>
        {elementListItems}
      </menu>
    </FilterBase>
  );
};
