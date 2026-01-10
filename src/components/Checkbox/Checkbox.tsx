import { clsx } from "clsx/lite";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC, ReactNode } from "react";

interface CheckboxProps {
  className?: string;
  children: ReactNode;
  value: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
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
