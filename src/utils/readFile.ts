import { parseJson } from "@/utils/parseJson";

import type { Har } from "har-format";
import type { PartialDeep } from "type-fest";

export const readHarFile = async (file: File): Promise<PartialDeep<Har>> => {
  const text = await file.text();
  const har = parseJson(text);

  return har ?? {};
};
