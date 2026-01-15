import { clsx } from "clsx/lite";

import styles from "./styles.module.css";

import type { FC, ReactNode } from "react";

interface ArtifactTableBodyRowProps {
  readonly className?: string;
  readonly ref: (node: HTMLTableRowElement | null) => void;
  readonly rowIndex: number;
  readonly rowStart: string;
  readonly renderName: () => ReactNode;
  readonly renderElement: () => ReactNode;
  readonly renderWeaponSpecialty: () => ReactNode;
  readonly renderSkills: () => ReactNode;
}

export const ArtifactTableBodyRow: FC<ArtifactTableBodyRowProps> = ({
  className,
  ref,
  rowIndex,
  rowStart,
  renderName,
  renderElement,
  renderWeaponSpecialty,
  renderSkills,
}) => {
  return (
    <tr
      className={clsx(styles.subgrid, styles.row, className)}
      style={{ transform: `translateY(${rowStart}px)` }}
      ref={ref}
      data-index={rowIndex}
    >
      {renderName()}
      {renderElement()}
      {renderWeaponSpecialty()}
      {renderSkills()}
    </tr>
  );
};
