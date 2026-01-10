import { useCallback, useState } from "react";

import { ArtifactTable } from "@/components/ArtifactTable";
import { Filter } from "@/components/Filter/Filter";
import { filtersDefault } from "@/data/filter";

import type { FC } from "react";

import type { Filters } from "@/data/filter";
import type { ParseArtifactHarResult } from "@/utils/parseArtifactHar";

interface FilterableViewProps {
  dataPromise: Promise<ParseArtifactHarResult> | null;
}

export const FilterableView: FC<FilterableViewProps> = ({ dataPromise }) => {
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
        />
      </main>
    </>
  );
};
