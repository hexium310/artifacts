import { useCallback, useState } from "react";

import { ArtifactTable } from "@/components/ArtifactTable";
import { Filter } from "@/components/Filter/Filter";
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

  const handleFiltersChange: (callback: (filter: Filters) => Filters) => void = useCallback((callback) => {
    setFilters(callback);
  }, []);

  return (
    <>
      <section>
        <Filter dataPromise={dataPromise} onFilterChange={handleFiltersChange} />
      </section>

      <main>
        <ArtifactTable
          dataPromise={dataPromise}
          filters={filters}
          virtualScrollRef={virtualScrollRef}
        />
      </main>
    </>
  );
};
