import { clsx } from "clsx/lite";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC, ReactNode } from "react";

interface CheckboxProps {
  readonly className?: string;
  readonly children: ReactNode;
  readonly value: string;
  readonly checked: boolean;
  readonly onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox: FC<CheckboxProps> = ({ className, children, value, checked, onChange }) => {
  return (
    <label className={clsx(styles.label, className)}>
      <input
        type="checkbox"
        autoComplete="off"
        name="element"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {children}
    </label>
  );
};
