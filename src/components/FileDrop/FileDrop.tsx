import { useEffect } from "react";

import { useDrop } from "./hooks";

import type { FC } from "react";

interface FileDropProps {
  onDrop: (file: File) => void;
}

export const FileDrop: FC<FileDropProps> = ({ onDrop }) => {
  const file = useDrop();

  useEffect(() => {
    if (file) {
      onDrop(file);
    }
  }, [file, onDrop]);

  return null;
};
