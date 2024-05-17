export type MapAttribute = {
    attribute: string;
    operator: string;
    value: string | number;
};

export type EffectType = {
    value: number;
    operator: string;
}

export type CardType = {
    title: string;
    description: string;
    rarity: string;
    variant: string;
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
}