import { Suspense, useCallback } from "react";

import { Dialog } from "@/components/Dialog";
import { useDialog } from "@/components/Dialog/hooks";
import { PaginatableList } from "@/components/PaginatableList";

import styles from "./styles.module.css";

import type { FC } from "react";

import type { ParseArtifactHarResult } from "@/utils/parseArtifactHar";

interface InGameListModalProps {
  readonly dataPromise: Promise<ParseArtifactHarResult> | null;
  readonly unnecessaries: Set<number>;
}

export const InGameListModal: FC<InGameListModalProps> = ({ dataPromise, unnecessaries }) => {
  const [ref, showModal] = useDialog();

  const handleClick = useCallback(() => {
    showModal();
  }, [showModal]);

  return (
    <>
      <button onClick={handleClick} disabled={dataPromise === null}>ゲーム内での位置を表示</button>
      <Dialog dialogClassName={styles.dialog} contentClassName={styles.content} ref={ref}>
        <Suspense fallback={<></>}>
          { dataPromise && <PaginatableList dataPromise={dataPromise} unnecessaries={unnecessaries} /> }
        </Suspense>
      </Dialog>
    </>
  );
};
