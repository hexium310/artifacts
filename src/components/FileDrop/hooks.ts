import { useEffect, useEffectEvent, useState } from "react";

export const useDrop = (): File | null => {
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = useEffectEvent((e: globalThis.DragEvent): void => {
    e.preventDefault();

    if (!(e.dataTransfer && [...e.dataTransfer.items].some((item) => item.kind === "file"))) {
      return;
    }

    e.dataTransfer.dropEffect = "copy";
  });

  const setDataTransferItemsFile = (dataTransfer: DataTransfer): void => {
    for (const item of dataTransfer.items) {
      if (!(item.kind === "file" && item.webkitGetAsEntry()?.name.endsWith(".har"))) {
        continue;
      }

      const file = item.getAsFile();
      if (file instanceof File) {
        setFile(file);
        break;
      }
    }
  };

  const handleDrop = useEffectEvent((e: globalThis.DragEvent): void => {
    e.preventDefault();

    if (!e.dataTransfer) {
      return;
    }

    setDataTransferItemsFile(e.dataTransfer);
  });

  useEffect(() => {
    window.addEventListener("dragover", handleDrag);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragover", handleDrag);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  return file;
};
