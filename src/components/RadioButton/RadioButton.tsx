import type { ChangeEventHandler, FC, ReactNode } from "react";

interface RadioButtonProps {
  children: ReactNode;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}

export const RadioButton: FC<RadioButtonProps> = ({ children, checked, onChange, value }) => {
  return (
    <label>
      <input
        type="radio"
        autoComplete="off"
        name="skill-filter-type"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {children}
    </label>
  );
};
