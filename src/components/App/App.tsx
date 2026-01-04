import { useCallback, useState } from "react";

import { ArtifactTable } from "@/components/ArtifactTable";
import { FileReceiver } from "@/components/FileReceiver";
import { Filter } from "@/components/Filter";

import type { ChangeEventHandler, FC, MouseEventHandler } from "react";

import type { Artifact } from "@/types/artifact";
import type { ElementId } from "@/types/element";
import type { SkillGroups } from "@/types/skillGroup";
import type { WeaponSpecialtyId } from "@/types/weaponSpecialty";

const elmentFilterDefault = {
  fire: false,
  water: false,
  earth: false,
  wind: false,
  light: false,
  dark: false,
};

const weaponSpecialtyFilterDefault = {
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
};

const skillFilterDefault = [] satisfies string[];

export const App: FC = () => {
  const [artifactPages, setArtifactPages] = useState<Artifact[]>([]);
  const [skillGroups, setSkillGroups] = useState<SkillGroups>([{}, {}, {}]);
  const [elementFilter, setElementFilter] = useState<Record<ElementId, boolean>>(elmentFilterDefault);
  const [weaponSpecialtyFilter, setWeaponSpecialtyFilter] = useState<Record<WeaponSpecialtyId, boolean>>(weaponSpecialtyFilterDefault);
  const [skillFilter, setSkillFilter] = useState<string[]>(skillFilterDefault);
  const [skillFilterType, setSkillFilterType] = useState<string>("marking");

  const onResolve = useCallback((artifacts: Artifact[], skillGroups: SkillGroups) => {
    setArtifactPages(artifacts);
    setSkillGroups(skillGroups);
  }, []);

  const handleChangeElementFilter: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { checked, value } = e.target;

    setElementFilter((v) => ({
      ...v,
      [value]: checked,
    }));
  }, []);

  const handleChangeWeaponSpecialtyFilter: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { checked, value } = e.target;

    setWeaponSpecialtyFilter((v) => ({
      ...v,
      [value]: checked,
    }));
  }, []);

  const handleChangeSkillFilter: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
    const options = [...e.target.selectedOptions];
    const values = options.map((option) => option.value);
    setSkillFilter(values);
  }, []);

  const handleChangeSkillFilterType: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setSkillFilterType(e.target.value);
  }, []);

  const handleClickElementFilterControllerReset: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setElementFilter(elmentFilterDefault);
  }, []);

  const handleClickWeaponSpecialtyFilterControllerReset: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setWeaponSpecialtyFilter(weaponSpecialtyFilterDefault);
  }, []);

  const handleClickSkillFilterControllerReset: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setSkillFilter(skillFilterDefault);
  }, []);

  return (
    <>
      <section>
        <FileReceiver onResolve={onResolve} />
      </section>

      <section>
        <Filter
          elementFilter={elementFilter}
          weaponSpecialtyFilter={weaponSpecialtyFilter}
          skillGroups={skillGroups}
          skillFilterValues={skillFilter}
          skillFilterType={skillFilterType}
          handleChangeElementFilter={handleChangeElementFilter}
          handleChangeWeaponSpecialtyFilter={handleChangeWeaponSpecialtyFilter}
          handleChangeSkillFilter={handleChangeSkillFilter}
          handleChangeSkillFilterType={handleChangeSkillFilterType}
          handleClickElementFilterControllerReset={handleClickElementFilterControllerReset}
          handleClickWeaponSpecialtyFilterControllerReset={handleClickWeaponSpecialtyFilterControllerReset}
          handleClickSkillFilterControllerReset={handleClickSkillFilterControllerReset}
        />
      </section>

      <main>
        <ArtifactTable
          artifacts={artifactPages}
          elementFilter={elementFilter}
          weaponSpecialtyFilter={weaponSpecialtyFilter}
          skillFilter={skillFilter}
          skillFilterType={skillFilterType}
        />
      </main>
    </>
  );
};
