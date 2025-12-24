import { useCallback, useState } from "react";

import { ArtifactTable } from "@/components/ArtifactTable";
import { FileReceiver } from "@/components/FileReceiver";
import { Filter } from "@/components/Filter";

import type { FC } from "react";
import type { PartialDeep } from "type-fest";

import type { Page } from "@/types/artifact";

export const App: FC = () => {
  const [artifactPages, setArtifactPages] = useState<PartialDeep<Page>[]>([]);

  const onResolve = useCallback((pages: PartialDeep<Page>[]) => {
    setArtifactPages(pages);
  }, [setArtifactPages]);

  return (
    <>
      <section>
        <FileReceiver onResolve={onResolve} />
      </section>

      <section>
        <Filter />
      </section>

      <main>
        <ArtifactTable artifactPages={artifactPages} />
      </main>
    </>
  );
};
