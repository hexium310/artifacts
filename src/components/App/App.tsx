import { useCallback, useState } from "react";

import { ArtifactTable } from "@/components/ArtifactTable";
import { FileReceiver } from "@/components/FileReceiver";
import { Filter } from "@/components/Filter";

import type { ChangeEventHandler, FC } from "react";

import type { ElementId } from "@/data/elements";
import type { WeaponSpecialtyId } from "@/data/weaponSpecialties";
import type { Artifact } from "@/types/artifact";
import type { SkillGroups } from "@/types/skillGroup";

export const App: FC = () => {
  const [artifactPages, setArtifactPages] = useState<Artifact[]>([]);
  const [skillGroups, setSkillGroups] = useState<SkillGroups>([{}, {}, {}]);
  const [elementFilter, setElementFilter] = useState<Record<ElementId, boolean>>({
    fire: false,
    water: false,
    earth: false,
    wind: false,
    light: false,
    dark: false,
  });
  const [weaponSpecialtyFilter, setWeaponSpecialtyFilter] = useState<Record<WeaponSpecialtyId, boolean>>({
    sabre: false,
    dagger: false,
    spear: false,
    axe: false,
    staff: false,
    gun: false,
    melee: false,
    bow: false,
    harp: false,
    katana: false,
  });

  const onResolve = useCallback((artifacts: Artifact[], skillGroups: SkillGroups) => {
    setArtifactPages(artifacts);
    setSkillGroups(skillGroups);
  }, [setArtifactPages]);

  const handleChangeElementFilter: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { checked, value } = e.target;

    setElementFilter((v) => ({
      ...v,
      [value]: checked,
    }));
  }, [setElementFilter]);

  const handleChangeWeaponSpecialtyFilter: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { checked, value } = e.target;

    setWeaponSpecialtyFilter((v) => ({
      ...v,
      [value]: checked,
    }));
  }, [setWeaponSpecialtyFilter]);

  return (
    <>
      <section>
        <FileReceiver onResolve={onResolve} />
      </section>

      <section>
        <Filter skillGroups={skillGroups} handleChangeElementFilter={handleChangeElementFilter} handleChangeWeaponSpecialtyFilter={handleChangeWeaponSpecialtyFilter} />
      </section>

      <main>
        <ArtifactTable artifacts={artifactPages} elementFilter={elementFilter} weaponSpecialtyFilter={weaponSpecialtyFilter} />
      </main>
    </>
  );
};
