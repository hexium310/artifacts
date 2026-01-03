import { useCallback, useState } from "react";

import { ArtifactTable } from "@/components/ArtifactTable";
import { FileReceiver } from "@/components/FileReceiver";
import { Filter } from "@/components/Filter";

import type { FC } from "react";

import type { Artifact } from "@/types/artifact";
import type { SkillGroups } from "@/types/skillGroup";

export const App: FC = () => {
  const [artifactPages, setArtifactPages] = useState<Artifact[]>([]);
  const [skillGroups, setSkillGroups] = useState<SkillGroups>([{}, {}, {}]);

  const onResolve = useCallback((artifacts: Artifact[], skillGroups: SkillGroups) => {
    setArtifactPages(artifacts);
    setSkillGroups(skillGroups);
  }, [setArtifactPages]);

  return (
    <>
      <section>
        <FileReceiver onResolve={onResolve} />
      </section>

      <section>
        <Filter skillGroups={skillGroups}/>
      </section>

      <main>
        <ArtifactTable artifacts={artifactPages} />
      </main>
    </>
  );
};
