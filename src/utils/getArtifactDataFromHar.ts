import { parseJson } from "@/utils/parseJson";

import type { Har } from "har-format";
import type { PartialDeep } from "type-fest";

import type { Page } from "@/types/artifact";
import type { RawPage } from "@/types/harContentText";

const extract = (data: RawPage): Page => {
  const {
    list,
    first,
    last,
    count,
    current,
  } = data;

  const newList = list.map((item) => {
    const {
      artifact_id,
      name,
      skill1_info,
      skill2_info,
      skill3_info,
      skill4_info,
      id,
      level,
      kind,
      attribute,
    } = item;

    const skill1Info = {
      skillId: skill1_info.skill_id,
      name: skill1_info.name,
      isMaxQuality: skill1_info.is_max_quality,
      effectValue: skill1_info.effect_value,
    };

    const skill2Info = {
      skillId: skill2_info.skill_id,
      name: skill2_info.name,
      isMaxQuality: skill2_info.is_max_quality,
      effectValue: skill2_info.effect_value,
    };

    const skill3Info = {
      skillId: skill3_info.skill_id,
      name: skill3_info.name,
      isMaxQuality: skill3_info.is_max_quality,
      effectValue: skill3_info.effect_value,
    };

    const skill4Info = {
      skillId: skill4_info.skill_id,
      name: skill4_info.name,
      isMaxQuality: skill4_info.is_max_quality,
      effectValue: skill4_info.effect_value,
    };

    return {
      artifact_id,
      name,
      skill1Info,
      skill2Info,
      skill3Info,
      skill4Info,
      id,
      level,
      kind,
      attribute,
    };
  });

  return {
    list: newList,
    first,
    last,
    count,
    current,
  };
};

export const getArtifactDataFromHar = (har: PartialDeep<Har> | null): PartialDeep<Page>[] => {
  const data = har?.log?.entries?.map((entry) => {
    const text = entry.response.content.text;
    if (!text) {
      return {};
    }

    const data = parseJson(text) as RawPage | null;
    if (!data) {
      return {};
    }

    return extract(data);
  }, {});

  return data ?? [];
};
