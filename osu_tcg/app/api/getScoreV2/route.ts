import { NextRequest, NextResponse } from "next/server";
import { ScoreRequestType, ScoreAttributeType} from "@/app/_types/scoreRequestType";
import { CardType, MapAttribute } from "@/app/_types/cardType";

// Takes in a ScoreRequestType
export const POST = async (request: NextRequest) => {
  const body = (await request.json()) satisfies ScoreRequestType;
  console.log(JSON.stringify(body, null, 4));

  const userScore = body.score;
  const userMods = body.mods;
  const userMap = body.map;
  const userAttributes = body.attributes;
  const userHand = body.hand;

  // Queues for flat bonus and percent bonus (flat first then percents second)
  const addQueue = [] as number[];
  const multiplyQueue = [] as number[];

  // Variant calculation (Holo, Poly)
  let polyCount = 0;
  for (let i = 0; i < userHand.length; i++) {
    // add 6% for every holo card
    if (userHand[i].variant == "Holographic") multiplyQueue.push(1.06);

    // add scaling percentage for every poly card
    if (userHand[i].variant == "Polychromatic") {
      polyCount++;
      if (polyCount < 3) multiplyQueue.push(1.06);
      else if (polyCount < 5) multiplyQueue.push(1.04);
      else if (polyCount < 7) multiplyQueue.push(1.02);
    }
  }

  // Enqueue's effects (DOES NOT SUPPORT MORE THAN ONE EFFECT ATM (thats why index is 0))
  const enqueueEffect = (i: number) => {
    console.log(`index ${i}`);
    console.log(userHand[i].effect);
    console.log(userHand[i].effect[0].operator);
    console.log(userHand[i].effect[0].operator === "mul");
    console.log(parseFloat(userHand[i].effect[0].value));
    if (userHand[i].effect[0].operator === "add") {
      addQueue.push(parseFloat(userHand[i].effect[0].value));
    }
    if (userHand[i].effect[0].operator === "mul") {
      multiplyQueue.push(parseFloat(userHand[i].effect[0].value));
    }
  };

  for (let i = 0; i < userHand.length; i++) {
    let currHand = userHand[i];
    console.log(`Starting Analysis of card ${userHand[i].title}`);
    if (!userHand[i].isEnabled || !userHand[i].autoSupported) {
      console.log("Not Enabled or Auto Supported");
      continue;
    }
    let valid = false;
    if (currHand.forceEffect || currHand.isUnconditional) {
      console.log("forceEffect or Unconditional true");
      valid = true;
    }

    // Mods Check
    // reduce(item passed on, other stuff ...)
    // written by false
    console.log(currHand.effectiveMods.length);
    if (!valid || !(currHand.effectiveMods.length == 0)) {
      console.log("here")
      console.log(userMods)
      console.log(currHand.effectiveMods)
      for(let j = 0; j < userMods.length; j++) {
        for(let k = 0; k < currHand.effectiveMods.length; k++) {
          console.log(userMods[j])
          console.log(currHand.effectiveMods[k])
          if(userMods[j] === currHand.effectiveMods[k]) {
            console.log("Valid Mod!");
            valid = true;
            console.log(userMods[j]);
            console.log(currHand.effectiveMods[k]);
            break;
          }
        }
      }

      // console.log("Checking Effective Mods");
      // valid = currHand.effectiveMods.reduce(
      //   (validAccum: boolean, effectiveMod: string) =>
      //     validAccum || userMods.includes(effectiveMod),
      // );
    }

    // Map Check
    if (!valid && currHand.effectiveMaps.includes(userMap)) {
      console.log("Valid Map");
      valid = true;
    }

    // Map Attribute Check
    if (!valid || !(currHand.effectiveAttributes.length == 0)) {
      for(let j = 0; j < currHand.effectiveAttributes.length; i++) {
        if(checkMapAttribute(currHand.effectiveAttributes[i], userAttributes)) {
          console.log("Valid Map Attribute");
          valid = true;
          break;
        }
      }
    }

    // If valid card, enqueue effect
    if (valid) {
      console.log(`Enquening effect for card ${currHand.title}`)
      enqueueEffect(i);
    }
  }

  // Variable storing calculated score
  let newScore = parseFloat(userScore!);

  console.log("---Add Queue---");
  console.log(addQueue);
  console.log("---Multiply Queue---");
  console.log(multiplyQueue);
  
  // Calculating newScore using add and multiply queues
  for (let i = 0; i < addQueue.length; i++) newScore += addQueue[i];
  for (let i = 0; i < multiplyQueue.length; i++) newScore *= multiplyQueue[i];
  
  console.log("---Calculated Score---");
  console.log(newScore);
  return NextResponse.json(newScore, { status: 200 });
};

const checkMapAttribute = (
  effectiveAttribute: MapAttribute,
  userAttributes: ScoreAttributeType[],
) => {
  console.log("checkMApAttribute");
  for (let i = 0; i < userAttributes.length; i++) {
    if (userAttributes[i].attribute == effectiveAttribute.attribute) {
      switch (effectiveAttribute.operator) {
        case "<":
          if (userAttributes[i].value < effectiveAttribute.value) return true;
          break;

        case "=":
          if (userAttributes[i].value == effectiveAttribute.value) return true;
          break;

        case ">":
          if (userAttributes[i].value > effectiveAttribute.value) return true;
          break;

        case "<=":
          if (userAttributes[i].value <= effectiveAttribute.value) return true;
          break;

        case ">=":
          if (userAttributes[i].value >= effectiveAttribute.value) return true;
          break;

        case "<>":
          if (userAttributes[i].value == effectiveAttribute.value) return true;
          break;

        case "><":
          if (userAttributes[i].value != effectiveAttribute.value) return true;
          break;
      }
    }
  }
  return false;
};
