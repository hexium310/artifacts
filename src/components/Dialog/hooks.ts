import { useCallback, useRef } from "react";

import type { RefObject } from "react";

export type DialogRef = Pick<HTMLDialogElement, "showModal" | "close">;

export const useDialog = (): [RefObject<DialogRef | null>, () => void, () => void] => {
  const ref = useRef<DialogRef>(null);

  const showModal = useCallback(() => {
    ref.current?.showModal();
  }, []);

  const close = useCallback(() => {
    ref.current?.close();
  }, []);

  return [ref, showModal, close];
};
