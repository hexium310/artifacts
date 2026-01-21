import { use, useCallback, useState } from "react";

import { InGameList } from "@/components/InGameList";
import { InGameListPagination } from "@/components/InGameListPagination";

import type { FC } from "react";

import type { ParseArtifactHarResult } from "@/utils/parseArtifactHar";

interface PaginatableListProps {
  readonly dataPromise: Promise<ParseArtifactHarResult>;
  readonly unnecessaries: Set<number>;
}

const perPage = 20;

function* listGenerator(indices: number[], length: number): Generator<boolean> {
  const set = new Set(indices);

  for (let i = 0; i < length; ++i) {
    yield set.has(i);
  }
}

export const PaginatableList: FC<PaginatableListProps> = ({ dataPromise, unnecessaries }) => {
  const [, artifactPositions] = use(dataPromise);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePaginationClick: (page: number) => void = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const unnecessaryItemPositions = new Map<number, number[]>();
  const pages = new Set<number>();
  for (const id of unnecessaries) {
    const { page, position } = artifactPositions[id];

    pages.add(page);

    const positions = unnecessaryItemPositions.get(page) ?? [];
    positions.push(position);
    unnecessaryItemPositions.set(page, positions);
  }

  const list = listGenerator(unnecessaryItemPositions.get(currentPage) ?? [], perPage).toArray();

  return (
    <>
      <InGameList list={list} />
      <InGameListPagination
        totalCount={Object.keys(artifactPositions).length / perPage}
        currentPage={currentPage}
        hasUnnecessaryItemPages={[...pages].toSorted((a, b) => a - b)}
        onClick={handlePaginationClick}
      />
    </>
  );
};
