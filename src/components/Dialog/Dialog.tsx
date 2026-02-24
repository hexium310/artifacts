import { clsx } from "clsx/lite";
import { useCallback, useImperativeHandle, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import styles from "./styles.module.css";

import type { FC, ReactNode, RefObject, SubmitEventHandler } from "react";

import type { DialogRef } from "@/components/Dialog/hooks";

interface DialogProps {
  readonly ref: RefObject<DialogRef | null>;
  readonly children: ReactNode;
  readonly dialogClassName?: string;
  readonly contentClassName?: string;
}

export const Dialog: FC<DialogProps> = ({ ref, children, dialogClassName, contentClassName }) => {
  const innerRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    showModal: () => {
      innerRef.current?.showModal();
    },
    close: () => {
      innerRef.current?.close();
    },
  }), [innerRef]);

  const subscriber = useCallback((onStoreChange: () => void): () => void => {
    const observer = new MutationObserver(onStoreChange);

    if (innerRef.current !== null) {
      observer.observe(innerRef.current, { attributes: true, attributeFilter: ["open"] });
    }

    return () => {
      observer.disconnect();
    };
  }, []);
  const getSnapshot = (): boolean => innerRef.current?.open ?? false;
  const getServerSnapshot = (): boolean => innerRef.current?.open ?? false;

  const isOpen = useSyncExternalStore(subscriber, getSnapshot, getServerSnapshot);

  const handleSubmit: SubmitEventHandler = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return createPortal(
    <dialog className={clsx(styles.dialog, dialogClassName)} closedby="any" ref={innerRef}>
      <form className={styles.close} method="dialog" onSubmit={handleSubmit}>
        <button className={styles.closeButton}>x</button>
      </form>
      <div className={clsx(styles.content, contentClassName)}>
        {isOpen && children}
      </div>
    </dialog>,
    document.body
  );
};
