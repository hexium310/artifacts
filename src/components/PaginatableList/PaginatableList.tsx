import { use, useCallback, useState } from "react";

import { InGameList } from "@/components/InGameList";
import { InGameListPagination } from "@/components/InGameListPagination";
import { perPage } from "@/data/pagination";

import type { FC } from "react";

import type { ParseArtifactHarResult } from "@/utils/parseArtifactHar";

interface PaginatableListProps {
  readonly dataPromise: Promise<ParseArtifactHarResult>;
  readonly unnecessaries: Set<number>;
}

function* booleanListGenerator(trueIndices: number[], length: number): Generator<boolean> {
  const set = new Set(trueIndices);

  for (let i = 0; i < length; ++i) {
    yield set.has(i);
  }
}

const considerUnnecessaryItems = (positions: Record<number, { page: number; position: number }>, unnecessaries: Set<number>): [Map<number, number[]>, Set<number>] => {
  const unnecessaryItemPositions = new Map<number, number[]>();
  const pages = new Set<number>();

  for (const id of unnecessaries) {
    const { page, position } = positions[id];

    pages.add(page);

    const p = unnecessaryItemPositions.get(page) ?? [];
    p.push(position);
    unnecessaryItemPositions.set(page, p);
  }

  return [unnecessaryItemPositions, pages];
};

const markPages = (totalCount: number, pagesContainingUnnecessaryItems: number[]): [number, boolean][] => {
  const allPages = [...Array<undefined>(totalCount)].map((_, i) => i + 1);
  const booleans = booleanListGenerator(pagesContainingUnnecessaryItems, totalCount + 1).drop(1);
  const pages = Iterator.zip([allPages, booleans]).toArray();

  return pages;
};

export const PaginatableList: FC<PaginatableListProps> = ({ dataPromise, unnecessaries }) => {
  const [, artifactPositions] = use(dataPromise);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePaginationClick: (page: number) => void = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const [unnecessaryItemPositions, pageSet] = considerUnnecessaryItems(artifactPositions, unnecessaries);

  const list = booleanListGenerator(unnecessaryItemPositions.get(currentPage) ?? [], perPage).toArray();

  const totalCount = Object.keys(artifactPositions).length / perPage;
  const pages = markPages(totalCount, [...pageSet].toSorted((a, b) => a - b));

  return (
    <>
      <InGameList list={list} />
      <InGameListPagination
        currentPage={currentPage}
        pages={pages}
        onClick={handlePaginationClick}
      />
    </>
  );
};
