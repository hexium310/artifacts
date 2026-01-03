import { use, useEffect } from "react";

import { parseArtifactHar } from "@/utils/parseArtifactHar";

import type { Har } from "har-format";
import type { FC } from "react";

import type { Artifact } from "@/types/artifact";
import type { ExternalData } from "@/types/externalData";

interface FileResolverProps {
  promise: Promise<ExternalData<Har>>;
  onResolve: (artifacts: Artifact[]) => void;
}

export const FileDataResolver: FC<FileResolverProps> = ({ promise, onResolve }) => {
  const har = use(promise);

  useEffect(() => {
    const [artifactData] = parseArtifactHar(har);
    // FIXME: 祖先に渡すのをやめる
    onResolve(artifactData);
  }, [har, onResolve]);

  return (
    <>
    </>
  );
};
