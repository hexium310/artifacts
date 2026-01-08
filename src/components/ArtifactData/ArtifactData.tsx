import { useCallback, useState } from "react";

import { FileDrop } from "@/components/FileDrop";
import { FilterableView } from "@/components/FilterableView";
import { parseArtifactHar } from "@/utils/parseArtifactHar";
import { readHarFile } from "@/utils/readFile";

import type { FC } from "react";

import type { ParseArtifactHarResult } from "@/utils/parseArtifactHar";

export const ArtifactData: FC = () => {
  const [dataPromise, setPromise] = useState<Promise<ParseArtifactHarResult> | null>(null);

  const handleFileReceive = useCallback((file: File) => {
    const promise = readHarFile(file);
    const result = promise.then((har) => parseArtifactHar(har));

    setPromise(result);
  }, []);

  return (
    <>
      <FileDrop onDrop={handleFileReceive} />

      <FilterableView dataPromise={dataPromise} />
    </>
  );
};
