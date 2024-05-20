export type MapAttribute = {
  attribute: string;
  operator: string;
  value: string | number;
};

export type EffectType = {
  value: string;
  operator: string;
};

export type CardType = {
  title: string;
  description: string;
  rarity: string;
  variant: VariantType;
  image: string;
  counter: number;
  forceEffect: boolean;
  autoSupported: boolean;
  isEnabled: boolean;
  isUnconditional: boolean;
  effect: EffectType[];
  effectiveMods: string[];
  effectiveMaps: string[];
  effectiveAttributes: MapAttribute[];
};

export type VariantType = "Polychromatic" | "Holographic" | "Basic";
