type Attribute = 1 | 2 | 3 | 4 | 5 | 6;

export type ElementId = "fire"
  | "water"
  | "earth"
  | "wind"
  | "light"
  | "dark";

export interface Element {
  attribute: Attribute;
  id: ElementId;
  text: string;
}
