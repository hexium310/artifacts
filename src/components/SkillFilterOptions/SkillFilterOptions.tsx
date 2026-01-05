import { Activity, Suspense, use, useCallback, useState } from "react";

import type { FC, MouseEventHandler } from "react";

import type { ParseArtifactHarResult } from "@/utils/parseArtifactHar";

interface SkillFilterOptionsProps {
  dataPromise: Promise<ParseArtifactHarResult>;
  group: 1 | 2 | 3;
  filterValues: string[];
}

interface SkillFilterOptgroupProps {
  dataPromise: Promise<ParseArtifactHarResult> | null;
  group: 1 | 2 | 3;
  filterValues: string[];
}

const groupIndex = {
  1: 0,
  2: 1,
  3: 2,
} as const;

export const SkillFilterOptions: FC<SkillFilterOptionsProps> = ({ dataPromise, group, filterValues }) => {
  const [, skillGroups] = use(dataPromise);

  const skillGroup = skillGroups[groupIndex[group]];

  return (
    <>
      {
        Object.entries(skillGroup).map(([id, name]) => <option key={id} value={id}>{name}</option>)
      }
    </>
  );
};

const togglePrefix = {
  "⏵": "⏷",
  "⏷": "⏵",
} as const;

export const SkillFilterOptgroup: FC<SkillFilterOptgroupProps> = ({ dataPromise, group, filterValues }) => {
  const [labelPrefix, setLabelPrefix] = useState<keyof typeof togglePrefix>("⏷");
  const [isOpen, setIsOpen] = useState(true);

  const handleOptgroupClick: MouseEventHandler<HTMLOptGroupElement> = useCallback((e) => {
    if (e.target instanceof HTMLElement && (e.target.nodeName !== "OPTGROUP" || e.shiftKey)) {
      return;
    }
    setIsOpen((v) => !v);
    setLabelPrefix((v) => togglePrefix[v]);
  }, []);

  return (
    <>
      <optgroup label={`${labelPrefix}スキルグループ ${"I".repeat(group)}`} onClick={handleOptgroupClick}>
        <Activity mode={isOpen ? "visible" : "hidden"}>
          <Suspense>
            { dataPromise && <SkillFilterOptions dataPromise={dataPromise} group={group} filterValues={filterValues} /> }
          </Suspense>
        </Activity>
      </optgroup>
    </>
  );
};
