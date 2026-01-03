import { use, useEffect } from "react";

import { parseArtifactHar } from "@/utils/parseArtifactHar";

import type { Har } from "har-format";
import type { FC } from "react";

import type { Artifact } from "@/types/artifact";
import type { ExternalData } from "@/types/externalData";
import type { SkillGroups } from "@/types/skillGroup";

interface FileResolverProps {
  promise: Promise<ExternalData<Har>>;
  onResolve: (artifacts: Artifact[], skillGroups: SkillGroups) => void;
}

export const FileDataResolver: FC<FileResolverProps> = ({ promise, onResolve }) => {
  const har = use(promise);

  useEffect(() => {
    const [artifactData, skillGroups] = parseArtifactHar(har);
    // FIXME: 祖先に渡すのをやめる
    onResolve(artifactData, skillGroups);
  }, [har, onResolve]);

  return (
    <>
    </>
  );
};
