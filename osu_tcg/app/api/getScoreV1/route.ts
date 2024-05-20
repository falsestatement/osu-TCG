import { NextRequest, NextResponse } from "next/server";
// @ root directory alias

/**
 *  _  _  _                           _         _______ _
 * (_)(_)(_)             _           ( )       (_______(_)            _
 *  _  _  _  ___  ____ _| |_ ___  ___|/  ___    _____   _  ____ ___ _| |_
 * | || || |/ _ \|  _ (_   _/ _ \|  _ \ /___)  |  ___) | |/ ___/___(_   _)
 * | || || | |_| | | | || || |_| | | | |___ |  | |     | | |  |___ | | |_
 *  \_____/ \___/|_| |_| \__\___/|_| |_(___/   |_|     |_|_|  (___/   \__)
 * (_____ \
 *  _____) _____  ____ ___ _____  ____
 * |  ____(____ |/ ___/___| ___ |/ ___)
 * | |    / ___ | |  |___ | ____| |
 * |_|____\_____|_|  (___/|_____|_|
 * (_____ \           _         _
 *  _____) ____ ___ _| |_ ___ _| |_ _   _ ____  _____
 * |  ____/ ___/ _ (_   _/ _ (_   _| | | |  _ \| ___ |
 * | |   | |  | |_| || || |_| || |_| |_| | |_| | ____|
 * |_|   |_|   \___/  \__\___/  \__)\__  |  __/|_____)
 *                                 (____/|_|
 */

// api thing for postman
export const GET = async (req: NextRequest) => {
  // User Paramenters (passed in through request)
  const score = req.nextUrl.searchParams.get("score");
  const mods = req.nextUrl.searchParams.get("mods")!.split(","); // ! - declares obj is never null (be careful says false (i dont know what to believe from him))
  const bpm = req.nextUrl.searchParams.get("bpm");
  const ar = req.nextUrl.searchParams.get("ar");
  const map = req.nextUrl.searchParams.get("map");
  const hand = JSON.parse(req.nextUrl.searchParams.get("hand"));

  // List of mods which are applicable for each card in hand
  const modList = hand.map((card) => {
    return getMods(card);
  });

  // [["hd"], [""], ["always"]]

  // List of maps which are applicable for each card in hand
  const mapList = hand.map((card) => {
    return getMaps(card);
  });
  // [[""], [""], ["dt1", "hr1"]]

  // List of map attributes which are applicable for each card in hand
  const mapAttributesList = hand.map((card) => {
    return getMapAttributes(card);
  });
  // [["bpm", <, 200], [""], ["dt1", "hr1"]]

  // List of effects to apply to score for each card in hand
  const effectList = hand.map((card) => {
    return getEffect(card);
  });

  // Queues for flat bonus and percent bonus (flat first then percents second)
  const addQueue = [];
  const multiplyQueue = [];

  // Variant calculation (Holo, Poly)
  let polyCount = 0;
  for (let i = 0; i < hand.length; i++) {
    // add 6% for every holo card
    if (hand[i].variant == "Holographic") multiplyQueue.push(1.06);

    // add scaling percentage for every poly card
    if (hand[i].variant == "Polychromatic") {
      polyCount++;
      if (polyCount < 3) multiplyQueue.push(1.06);
      else if (polyCount < 5) multiplyQueue.push(1.04);
      else if (polyCount < 7) multiplyQueue.push(1.02);
    }
  }

  // enqueues effect for card i into the addQueue and multiplyQueue
  const enqueueEffect = (i) => {
    while (effectList[i] == undefined) effectList.shift(); // undefined workaround (idk why first element is undefined who fckn knows oh well)
    if (effectList[i][1] == "+") addQueue.push(parseFloat(effectList[i][0]));
    if (effectList[i][1] == "*")
      multiplyQueue.push(parseFloat(effectList[i][0]));
  };

  for (let i = 0; i < modList.length; i++) {
    // If statements to check whether cards are valid and if effects are in play

    // bool to indicate whether card mod requirement is met or not
    let validMod = false;
    for (let j = 0; j < mods.length; j++) {
      if (modList[i].includes(mods[j]) || modList[i].includes("always"))
        validMod = true;
    }

    // enqueue effect if mod req is met
    if (validMod) {
      enqueueEffect(i);
    }

    // enqueue effect if map req is met
    if (map != "" && mapList[i].includes(map)) {
      enqueueEffect(i);
    }

    // enqueue effect if BPM req is met
    if (mapAttributesList[i].includes("bpm")) {
      if (mapAttributesList[i][1] == ">")
        if (bpm > mapAttributesList[i][2]) enqueueEffect(i);
      if (mapAttributesList[i][1] == "=")
        if (bpm == mapAttributesList[i][2]) enqueueEffect(i);
      if (mapAttributesList[i][1] == "<")
        if (bpm < mapAttributesList[i][2]) enqueueEffect(i);
      if (mapAttributesList[i][1] == "<=")
        if (bpm <= mapAttributesList[i][2]) enqueueEffect(i);
      if (mapAttributesList[i][1] == ">=")
        if (bpm >= mapAttributesList[i][2]) enqueueEffect(i);
    }

    // enqueue effect if AR req is met
    if (mapAttributesList[i].includes("ar")) {
      if (mapAttributesList[i][1] == ">")
        if (ar > mapAttributesList[i][2]) enqueueEffect(i);
      if (mapAttributesList[i][1] == "=")
        if (ar == mapAttributesList[i][2]) enqueueEffect(i);
      if (mapAttributesList[i][1] == "<")
        if (ar < mapAttributesList[i][2]) enqueueEffect(i);
      if (mapAttributesList[i][1] == "<=")
        if (ar <= mapAttributesList[i][2]) enqueueEffect(i);
      if (mapAttributesList[i][1] == ">=")
        if (ar >= mapAttributesList[i][2]) enqueueEffect(i);
    }
  }

  // Variable storing calculated score
  let newScore = parseFloat(score!);

  // Calculating newScore using add and multiply queues
  for (let i = 0; i < addQueue.length; i++) newScore += addQueue[i];
  for (let i = 0; i < multiplyQueue.length; i++) newScore *= multiplyQueue[i];

  // Returns newScore to client
  return NextResponse.json(newScore, { status: 200 });
};

// --- Parsers for User Parameters ---

// returns array of mods as strings
const getMods = (card) => {
  if (!card.mods) return [""];
  return card.mods.split(",");
};

// returns array of valid map picks as strings
const getMaps = (card) => {
  if (!card.map) return [""];
  return card.map.split(",");
};

// returns array of valid map attributes (ex. bpm, ar, cs...) as strings
const getMapAttributes = (card) => {
  if (!card.map_attribute) return [""];
  let attributes = card.map_attribute.split(",");
  const attributeComponents = attributes.map((attribute) => {
    return attribute.split("|");
  });
  return attributeComponents;
};

// returns array of card effects with score and manipulator (ex. [15000, "+"])
const getEffect = (card) => {
  if (!card.effect) return [""];
  if (card.effect[card.effect.length - 1] == "*")
    return [card.effect.slice(0, card.effect.length - 1), "*"];
  if (card.effect[card.effect.length - 1] == "+")
    return [card.effect.slice(0, card.effect.length - 1), "+"];
  if (card.effect[card.effect.length - 1] == " ")
    return [card.effect.slice(0, card.effect.length - 1), "+"]; // added this case cuz plus signs fucking break with stringify or parser
  return;
};
