import { useCallback, useState } from "react";

import { ArtifactTable } from "@/components/ArtifactTable";
import { FileReceiver } from "@/components/FileReceiver";
import { Filter } from "@/components/Filter";

import type { FC } from "react";

import type { Artifact } from "@/types/artifact";

export const App: FC = () => {
  const [artifactPages, setArtifactPages] = useState<Artifact[]>([]);

  const onResolve = useCallback((artifacts: Artifact[]) => {
    setArtifactPages(artifacts);
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
        <ArtifactTable artifacts={artifactPages} />
      </main>
    </>
  );
};
