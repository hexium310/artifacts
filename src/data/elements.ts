import type { Element } from "@/types/element";

export type ElementText = typeof ElementText[keyof typeof ElementText];

export const ElementText = {
  Fire: "火",
  Water: "水",
  Earth: "土",
  Wind: "風",
  Light: "光",
  Dark: "闇",
} as const;

export const elements = [
  {
    attribute: 1,
    id: "fire",
    text: ElementText.Fire,
  },
  {
    attribute: 2,
    id: "water",
    text: ElementText.Water,
  },
  {
    attribute: 3,
    id: "earth",
    text: ElementText.Earth,
  },
  {
    attribute: 4,
    id: "wind",
    text: ElementText.Wind,
  },
  {
    attribute: 5,
    id: "light",
    text: ElementText.Light,
  },
  {
    attribute: 6,
    id: "dark",
    text: ElementText.Dark,
  },
] satisfies Element[];

export const getElementByAttribute = (attribute: number): Element | undefined => {
  return elements.find((element) => element.attribute === attribute);
};

export const getElement = (id: string): Element | undefined => {
  return elements.find((element) => element.id === id);
};
