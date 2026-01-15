import { useCallback, useRef, useState } from "react";

import { FileDrop } from "@/components/FileDrop";
import { FilterableView } from "@/components/FilterableView";
import { VirtualScroll } from "@/components/VirtualScroll";
import { parseArtifactHar } from "@/utils/parseArtifactHar";
import { readHarFile } from "@/utils/readFile";

import type { FC } from "react";

import type { ParseArtifactHarResult } from "@/utils/parseArtifactHar";

export const ArtifactData: FC = () => {
  const virtualScrollRef = useRef<HTMLDivElement>(null);

  const [dataPromise, setPromise] = useState<Promise<ParseArtifactHarResult> | null>(null);

  const handleFileReceive = useCallback((file: File) => {
    const promise = readHarFile(file);
    const result = promise.then((har) => parseArtifactHar(har));

    setPromise(result);
  }, []);

  return (
    <>
      <VirtualScroll virtualScrollRef={virtualScrollRef}>
        <FileDrop onDrop={handleFileReceive} />

        <FilterableView dataPromise={dataPromise} virtualScrollRef={virtualScrollRef} />
      </VirtualScroll>
    </>
  );
};
