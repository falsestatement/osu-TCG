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

// import card_database from "@/app/_data/card_database.json"

// api thing for postwahtever
export const GET = async (req:NextRequest) => {
    // User 
    const score = req.nextUrl.searchParams.get("score");
    const mods = req.nextUrl.searchParams.get("mods")!.split(","); // ! - declares obj is never null (be careful says false (i dont know what to believe from him))
    const bpm = req.nextUrl.searchParams.get("bpm");
    const ar = req.nextUrl.searchParams.get("ar");
    const map = req.nextUrl.searchParams.get("map");
    const hand = JSON.parse(req.nextUrl.searchParams.get("hand"));
    console.log("-------Hand-------");
    console.log(hand);
    console.log("--------------");

    // List of mods which are applicable for every card with index i
    const modList = hand.map((card) => {
        return getMods(card);
    });

    const mapList = hand.map((card) => {
        return getMaps(card);
    });
    
    const mapAttributesList = hand.map((card) => {
        return getMapAttributes(card);
    });
    
    const effectList = hand.map((card) => {
        return getEffect(card);
    });

    // Queues for flat bonus and percent bonus (flat all gets added first then percents)
    const addQueue = [];
    const multiplyQueue = [];


    // enqueues effect given index i in card_database
    const enqueueEffect = (i) => {
        while(effectList[i] == undefined) effectList.shift(); // undefined workaround (idk why first element is undefined who fckn knows oh well)
        if(effectList[i][1] == "+") addQueue.push(parseFloat(effectList[i][0]));
        if(effectList[i][1] == "*") multiplyQueue.push(parseFloat(effectList[i][0]));
        console.log(effectList[i][0]);
    }
    
    let newScore = parseFloat(score!);
    for(let i = 0; i < modList.length; i++) {
        // console.log(hand[i].title);
        // console.log(modList);
        // If statements to check whether cards are valid and if effects are in play
        
        console.log("---ValidMod?---")
        console.log(modList[i].includes(...mods) || modList[i].includes("always"))
        if(modList[i].includes(...mods) || modList[i].includes("always")) { // includes either of the strings in mods (╯°□°)╯︵ ┻━┻
            console.log("---ModList---")
            console.log(modList);
            console.log("---Mods---")
            console.log(mods);
            enqueueEffect(i);
        }
        
        
        if(map != "" && mapList[i].includes(map)) { // includes either of the strings in mods (╯°□°)╯︵ ┻━┻
            // console.log(hand[i].title);
            enqueueEffect(i);
        }
        
        if(mapAttributesList[i].includes("bpm")) {
            // console.log(hand[i].title);
            if(mapAttributesList[i][1] == ">")
                if(bpm > mapAttributesList[i][2]) enqueueEffect(i);
            if(mapAttributesList[i][1] == "=")
                if(bpm == mapAttributesList[i][2]) enqueueEffect(i);
            if(mapAttributesList[i][1] == "<")
                if(bpm < mapAttributesList[i][2]) enqueueEffect(i);
            if(mapAttributesList[i][1] == "<=")
                if(bpm <= mapAttributesList[i][2]) enqueueEffect(i);
            if(mapAttributesList[i][1] == ">=")
                if(bpm >= mapAttributesList[i][2]) enqueueEffect(i);
            }

        if(mapAttributesList[i].includes("ar")) {
            if(mapAttributesList[i][1] == ">")
                if(ar > mapAttributesList[i][2]) enqueueEffect(i);
            if(mapAttributesList[i][1] == "=")
                if(ar == mapAttributesList[i][2]) enqueueEffect(i);
            if(mapAttributesList[i][1] == "<")
                if(ar < mapAttributesList[i][2]) enqueueEffect(i);
            if(mapAttributesList[i][1] == "<=")
                if(ar <= mapAttributesList[i][2]) enqueueEffect(i);
            if(mapAttributesList[i][1] == ">=")
                if(ar >= mapAttributesList[i][2]) enqueueEffect(i);
        }
    }
    
    
    console.log(addQueue);
    console.log(multiplyQueue);

    // Calculating newScore using filled queues
    for(let i = 0; i < addQueue.length; i++) {
        newScore += addQueue[i];
    }
    
    for(let i = 0; i < multiplyQueue.length; i++) {
        newScore *= multiplyQueue[i];
    }
    console.log(newScore);
    return NextResponse.json(newScore, {status:200});
}

// PARSERS FOR PASSED IN PARAMETERS
const getMods = (card) => {
    if(!card.mods) return [""];
    return card.mods.split(',');
}

const getMaps = (card) => {
    if(!card.map) return [""];
    return card.map.split(',');
}

const getMapAttributes = (card) => {
    if(!card.map_attribute) return [""];
    console.log("hay");
    let attributes = card.map_attribute.split(',');
    const attributeComponents = attributes.map((attribute) => {
        return attribute.split("|");
    });
    return attributeComponents;
}

const getEffect = (card) => {
    if(!card.effect) return [""];
    if(card.effect[card.effect.length - 1] == "*") return [card.effect.slice(0, card.effect.length - 1), "*"];
    if(card.effect[card.effect.length - 1] == "+") return [card.effect.slice(0, card.effect.length - 1), "+"];
    if(card.effect[card.effect.length - 1] == " ") return [card.effect.slice(0, card.effect.length - 1), "+"]; // added this case cuz plus signs fucking break with stringify or parser
    return;
}
