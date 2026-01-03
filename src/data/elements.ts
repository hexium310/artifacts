export type Element = typeof Element[keyof typeof Element];
export type ElementId = Lowercase<keyof typeof Element>;
type Attribute = typeof attributes[number];

interface ElementRelation {
  attribute: Attribute;
  id: ElementId;
  text: Element;
}

const attributes = [1, 2, 3, 4, 5, 6] as const;

export const Element = {
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
    text: Element.Fire,
  },
  {
    attribute: 2,
    id: "water",
    text: Element.Water,
  },
  {
    attribute: 3,
    id: "earth",
    text: Element.Earth,
  },
  {
    attribute: 4,
    id: "wind",
    text: Element.Wind,
  },
  {
    attribute: 5,
    id: "light",
    text: Element.Light,
  },
  {
    attribute: 6,
    id: "dark",
    text: Element.Dark,
  },
] satisfies ElementRelation[];

const isAttribute = (number: number): number is Attribute => {
  return attributes.includes(number as Attribute);
};

export const getElementFromAttribute = (attribute: number): ElementRelation | undefined => {
  if (!isAttribute(attribute)) {
    return undefined;
  }

  return elements.find((element) => element.attribute === attribute);
};
