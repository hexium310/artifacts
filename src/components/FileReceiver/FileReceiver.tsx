import { Suspense, useCallback, useState } from "react";

import { FileDataResolver } from "@/components/FileDataResolver";
import { FileDrop } from "@/components/FileDrop";
import { readHarFile } from "@/utils/readFile";

import type { FC } from "react";
import type { PartialDeep } from "type-fest";

import type { Page } from "@/types/artifact";

interface FileReceiverProps {
  onResolve: (pages: PartialDeep<Page>[]) => void;
}

export const FileReceiver: FC<FileReceiverProps> = ({ onResolve }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleOpenFile = useCallback((file: File) => {
    setFile(file);
  }, []);

  return (
    <>
      <FileDrop onDrop={handleOpenFile} />
      <Suspense fallback={<></>}>
        {file && <FileDataResolver promise={readHarFile(file)} onResolve={onResolve} />}
      </Suspense>
    </>
  );
};
