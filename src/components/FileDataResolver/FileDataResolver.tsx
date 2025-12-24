import { use, useEffect } from "react";

import { getArtifactDataFromHar } from "@/utils/getArtifactDataFromHar";

import type { Har } from "har-format";
import type { FC } from "react";
import type { PartialDeep } from "type-fest";

import type { Page } from "@/types/artifact";

interface FileResolverProps {
  promise: Promise<PartialDeep<Har>>;
  onResolve: (pages: PartialDeep<Page>[]) => void;
}

export const FileDataResolver: FC<FileResolverProps> = ({ promise, onResolve }) => {
  const har = use(promise);

  useEffect(() => {
    const artifactData = getArtifactDataFromHar(har);
    onResolve(artifactData);
  }, [har, onResolve]);

  return (
    <>
    </>
  );
};
