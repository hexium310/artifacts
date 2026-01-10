import { useEffect, useEffectEvent } from "react";

import { getFilesFromTransferItems } from "@/utils/getFilesFromTransferItems";

import type { FC } from "react";

interface FileDropProps {
  readonly onDrop: (file: File) => void;
}

export const FileDrop: FC<FileDropProps> = ({ onDrop }) => {
  const handleDrag = useEffectEvent((e: globalThis.DragEvent): void => {
    e.preventDefault();

    if (!(e.dataTransfer && [...e.dataTransfer.items].some((item) => item.kind === "file"))) {
      return;
    }

    e.dataTransfer.dropEffect = "copy";
  });

  const handleDrop = useEffectEvent((e: globalThis.DragEvent): void => {
    e.preventDefault();

    if (!e.dataTransfer) {
      return;
    }

    const files = getFilesFromTransferItems(e.dataTransfer);

    for (const file of files) {
      onDrop(file);
      break;
    }
  });

  useEffect(() => {
    const abortController = new AbortController();
    window.addEventListener("dragover", handleDrag, { signal: abortController.signal });
    window.addEventListener("drop", handleDrop, { signal: abortController.signal });

    return () => {
      abortController.abort();
    };
  }, []);

  return null;
};
