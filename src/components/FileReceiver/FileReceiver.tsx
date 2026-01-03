import { Suspense, useCallback, useState } from "react";

import { FileDataResolver } from "@/components/FileDataResolver";
import { FileDrop } from "@/components/FileDrop";
import { readHarFile } from "@/utils/readFile";

import type { Har } from "har-format";
import type { FC } from "react";

import type { Artifact } from "@/types/artifact";
import type { ExternalData } from "@/types/externalData";
import type { SkillGroups } from "@/types/skillGroup";

interface FileReceiverProps {
  onResolve: (artifacts: Artifact[], skillGroups: SkillGroups) => void;
}

export const FileReceiver: FC<FileReceiverProps> = ({ onResolve }) => {
  const [promise, setPromise] = useState<Promise<ExternalData<Har>> | null>(null);

  const handleOpenFile = useCallback((file: File) => {
    setPromise(readHarFile(file));
  }, []);

  return (
    <>
      <FileDrop onDrop={handleOpenFile} />
      <Suspense fallback={<></>}>
        {promise && <FileDataResolver promise={promise} onResolve={onResolve} />}
      </Suspense>
    </>
  );
};
