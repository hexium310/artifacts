import type { ChangeEventHandler, FC, ReactNode } from "react";

interface RadioButtonProps {
  readonly children: ReactNode;
  readonly checked: boolean;
  readonly onChange: ChangeEventHandler<HTMLInputElement>;
  readonly value: string;
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
