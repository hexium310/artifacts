import { useCallback, useState } from "react";

import { ArtifactTable } from "@/components/ArtifactTable";
import { Filter } from "@/components/Filter/Filter";
import { InGameListModal } from "@/components/InGameListModal";
import { filtersDefault } from "@/data/filter";

import type { FC, RefObject } from "react";

import type { Filters } from "@/data/filter";
import type { ParseArtifactHarResult } from "@/utils/parseArtifactHar";

interface FilterableViewProps {
  readonly dataPromise: Promise<ParseArtifactHarResult> | null;
  readonly virtualScrollRef: RefObject<HTMLDivElement | null>;
}

export const FilterableView: FC<FilterableViewProps> = ({ dataPromise, virtualScrollRef }) => {
  const [filters, setFilters] = useState<Filters>(filtersDefault);
  const [unnecessaries, setUnnecessaries] = useState(new Set<number>());

  const handleFiltersChange: (callback: (filter: Filters) => Filters) => void = useCallback((callback) => {
    setFilters(callback);
  }, []);

  const handleRowClick = useCallback((id: number) => {
    setUnnecessaries((v) => {
      const newSet = new Set(v);
      const succeeded = newSet.delete(id);
      if (!succeeded) {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  return (
    <>
      <section>
        <Filter dataPromise={dataPromise} onFilterChange={handleFiltersChange} />
      </section>

      <section>
        <InGameListModal dataPromise={dataPromise} unnecessaries={unnecessaries} />
      </section>

      <main>
        <ArtifactTable
          dataPromise={dataPromise}
          filters={filters}
          virtualScrollRef={virtualScrollRef}
          unnecessaries={unnecessaries}
          onRowClick={handleRowClick}
        />
      </main>
    </>
  );
};
