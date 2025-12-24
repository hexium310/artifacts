import { clsx } from "clsx/lite";

import { ElementFilterController } from "@/components/ElementFilterController";
import { FilterBase } from "@/components/FilterBase";
import { elements } from "@/data/elements";

import styles from "./styles.module.css";

import type { FC } from "react";

export const ElementFilter: FC = () => {
  const elementListItems = elements
    .sort((a, b) => a.attribute - b.attribute)
    .map(({ id, text }) => (
      <li key={id}>
        <label className={clsx(styles.label, styles[id])}>
          <input type="checkbox" autoComplete="off" name="element" value={text} />
          {text}
        </label>
      </li>
    ));

  return (
    <FilterBase legend="属性" controller={<ElementFilterController />}>
      <menu className={styles.list}>
        {elementListItems}
      </menu>
    </FilterBase>
  );
};
