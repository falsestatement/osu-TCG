import card_database from "@/app/_data/card_database.json";
import { NextRequest, NextResponse } from "next/server";
import { CardType, MapAttribute } from "@/app/_types/cardType";

export const GET = async () => {
  const updated = card_database.map((card): CardType => {
    return {
      title: card.title,
      description: card.description,
      rarity: card.rarity,
      variant: "",
      image: card.image,
      counter: 0,
      forceEffect: false,
      autoSupported: card.autoSupported === "TRUE",
      isEnabled: true,
      isUnconditional: card.isUnconditional === "TRUE",
      // effect is fucked hmmmmmmmm
      effect: `${card.effect}`.split(",").map((cardEffect, index) => ({
        value: cardEffect,
        operator: `${card.operation}`.split(",")[index],
      })),
      effectiveMods: card.effectiveMods
        .split(",")
        .filter((mod) => !!mod) as string[],
      effectiveMaps: card.effectiveMaps
        .split(",")
        .filter((map) => !!map) as string[],
      effectiveAttributes: card.effectiveAttributes
        .split(",")
        .map((attribute) => parseEffectiveAttribute(attribute))
        .filter((attribute) => !!attribute) as MapAttribute[],
    };
  });
  console.log(updated);
  return NextResponse.json(updated, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const result = parseEffectiveAttribute(body.value);
  return NextResponse.json(result ? result : "fucked", { status: 200 });
};

/*
    @param {string} attributeStr The custom syntax attribute string stored in db.
*/
const parseEffectiveAttribute = (
  attributeStr: string,
): MapAttribute | undefined => {
  const validOperatorList = ["<", ">", "="];

  // invalid syntax check
  // op at start
  if (validOperatorList.includes(attributeStr[0])) return undefined;

  // op at end
  if (validOperatorList.includes(attributeStr[attributeStr.length - 1]))
    return undefined;

  // no ops
  /* 
        / regex notation
        . any char
        * 0 or more preceeding token
        [] capture group (any char within)
    */
  if (!attributeStr.match(/.*[<>=].*/)) return undefined;

  let result = {
    attribute: "",
    operator: "",
    value: "",
  };

  // skipping first and last index due to previous check
  for (let i = 1; i < attributeStr.length - 1; i++) {
    const isCurCharOp = validOperatorList.includes(attributeStr[i]);
    const isNextCharOp = validOperatorList.includes(attributeStr[i + 1]);

    // check for double char operators
    if (isCurCharOp && isNextCharOp) {
      result.attribute = attributeStr.substring(0, i);
      result.operator = attributeStr.substring(i, i + 2);
      result.value = attributeStr.substring(i + 2);
      break;
    }

    // check for single char operators
    if (isCurCharOp) {
      result.attribute = attributeStr.substring(0, i);
      result.operator = attributeStr.substring(i, i + 1);
      result.value = attributeStr.substring(i + 1);
      break;
    }
  }
  return result;
};
