import { CardType, MapAttribute } from "@/app/_types/cardType";

export type ScoreRequestType = {
  score: number;
  mods: string[];
  map: string;
  attributes: ScoreAttribute[];
  hand: CardType[];
};

export type ScoreAttributeType = {
  attribute: string;
  value: string;
};
