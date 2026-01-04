import type { Har } from "har-format";
import type { PartialDeep } from "type-fest";

export const readHarFile = async (file: File): Promise<PartialDeep<Har>> => {
  const text = await file.text();
  const har = JSON.parse(text) as PartialDeep<Har>;

  return har;
};
