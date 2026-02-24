import { clsx } from "clsx/lite";
import { useCallback } from "react";

import { Checkbox } from "@/components/Checkbox";

import styles from "./styles.module.css";

import type { ChangeEventHandler, FC, MouseEventHandler, ReactNode } from "react";

interface ArtifactTableBodyRowProps {
  readonly className?: string;
  readonly ref: (node: HTMLTableRowElement | null) => void;
  readonly rowIndex: number;
  readonly rowStart: string;
  readonly artifactId: number;
  readonly isUnnecessary: boolean;
  readonly renderName: () => ReactNode;
  readonly renderElement: () => ReactNode;
  readonly renderWeaponSpecialty: () => ReactNode;
  readonly renderSkills: () => ReactNode;
  readonly onClick: (id: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function -- delegates handling to handler of table row click
const handleChange: ChangeEventHandler<HTMLInputElement> = () => { };

export const ArtifactTableBodyRow: FC<ArtifactTableBodyRowProps> = ({
  className,
  ref,
  rowIndex,
  rowStart,
  artifactId,
  isUnnecessary,
  renderName,
  renderElement,
  renderWeaponSpecialty,
  renderSkills,
  onClick,
}) => {
  const handleClick: MouseEventHandler<HTMLTableRowElement> = useCallback(() => {
    onClick(artifactId);
  }, [artifactId, onClick]);

  return (
    <tr
      className={clsx(styles.subgrid, styles.row, className)}
      style={{ translate: `0 ${rowStart}px` }}
      ref={ref}
      data-index={rowIndex}
      onClick={handleClick}
    >
      <td><Checkbox className={styles.unnecessary} checked={isUnnecessary} onChange={handleChange} /></td>
      {renderName()}
      {renderElement()}
      {renderWeaponSpecialty()}
      {renderSkills()}
    </tr>
  );
};
