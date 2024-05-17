"use client";
import TCGCard from "./_components/TCGCard/page.tsx";
import ComboBox from "./_components/ComboBox/page.tsx";
import card_database from "./_data/card_database.json";
import { useState, useEffect } from "react";

export default function Home() {
  const [cardQuery, setCardQuery] = useState("");
  const [variantQuery, setVariantQuery] = useState("");
  const [redCards, setRedCards] = useState([]);
  const [blueCards, setBlueCards] = useState([]);
  const [redCardID, setRedCardID] = useState(0);
  const [blueCardID, setBlueCardID] = useState(0);
  const [redCardView, setRedCardView] = useState(false);
  const [currentViewRedCard, setCurrentViewRedCard] = useState({});
  const [blueCardView, setBlueCardView] = useState(false);
  const [currentViewBlueCard, setCurrentViewBlueCard] = useState({});
  const [redScore, setRedScore] = useState("");
  const [blueScore, setBlueScore] = useState("");
  const [redParseParams, setRedParseParams] = useState({
    score: "0",
    mods: ["nm"],
    map: "",
    bpm: "",
    ar: "",
    hand: {}
  });
  const [blueParseParams, setBlueParseParams] = useState({
    score: "0",
    mods: ["nm"],
    map: "",
    bpm: "",
    ar: "",
    hand: {}
  });

  // class InputParams {
  //   private score: string = '0';
  //   private mods: string[] = ['nm'];
  //   private map: string = '';
  //   private bpm: string = '';
  //   private ar: string = '';
  //   private hand: string[] = [];
  
  //   constructor(score: string, mods: string[], map: string, bpm: string, ar: string, hand: string[]) {
  //     this.score = score;
  //     this.mods = mods;
  //     this.map = map;
  //     this.bpm = bpm;
  //     this.ar = ar;
  //     this.hand = hand;
  //   }
  // }

  const numCardsPerRow = 9;
  const numRows = 3;
  const cardVariants = ["Normal", "Holographic", "Polychromatic"];

  const onRedCardClick = (card) => {
    setCurrentViewRedCard(card);
    setRedCardView(true);
  };

  const onBlueCardClick = (card) => {
    setCurrentViewBlueCard(card);
    setBlueCardView(true);
  };


  // An Async function which fetches a response from the API (which calculates a score based on mods and whatnot)
  // Then converts it to a JSON and uses score state to set score.
  const fetchData = async () => {
    const redReq = await fetch(`/api/getParsedCards?score=${redParseParams.score}&mods=${redParseParams.mods}&bpm=${redParseParams.bpm}&ar=${redParseParams.ar}&map=${redParseParams.map}&hand=${redParseParams.hand}`);
    const redReqJSON = await redReq.json();
    setRedScore(redReqJSON);

    const blueReq = await fetch(`/api/getParsedCards?score=${blueParseParams.score}&mods=${blueParseParams.mods}&bpm=${blueParseParams.bpm}&ar=${blueParseParams.ar}&map=${blueParseParams.map}&hand=${blueParseParams.hand}`);
    const blueReqJSON = await blueReq.json();
    setBlueScore(blueReqJSON);
  }

  useEffect(() => {
    const scaleFactor = Math.max(
      Math.min(-(1 / 8) * (redCards.length - 3) + 1.2, 1.2),
      0.7,
    );
    document.body.style.setProperty("--row-scale-red", `${scaleFactor}`);
  }, [redCards.length]);

  useEffect(() => {
    const scaleFactor = Math.max(
      Math.min(-(1 / 8) * (blueCards.length - 3) + 1.2, 1.2),
      0.7,
    );
    document.body.style.setProperty("--row-scale-blue", `${scaleFactor}`);
  }, [blueCards.length]);


  // Prints user input for input data
  useEffect(() => {
    // console.log({
    //   score: redParseParams.score,
    //   mods: redParseParams.mods.join(","),
    //   map: redParseParams.map,
    //   bpm: redParseParams.bpm,
    //   ar: redParseParams.ar,
    //   hand: redParseParams.hand
    // });
  }, [redParseParams])
  return (
    <main className="flex flex-col gap-5 items-center">
      <div className="flex overflow-hidden bg-gradient-to-r from-red-500 from-40% to-blue-500 to-60% h-[960px] w-[2560px] min-h-[960px] min-w-[2560px] max-h-[960px] max-w-[2560px]">
        <div className="relative flex flex-col h-full w-1/2 justify-center items-center">
          {redCardView && (
            <div
              onClick={() => setRedCardView(false)}
              className="absolute h-full w-full bg-gray-900 bg-opacity-70 z-10 flex justify-center items-center"
            >
              <div className="[transform:scale(2)]">
                <TCGCard
                  title={currentViewRedCard.title}
                  description={currentViewRedCard.description}
                  variant={currentViewRedCard.variant}
                  rarity={currentViewRedCard.rarity}
                  image={currentViewRedCard.image}
                  onClose={() => setRedCardView(false)}
                />
              </div>
            </div>
          )}
          {Array(numRows)
            .fill(undefined)
            .map((_, rowNum) => (
              <div
                key={`row-${rowNum}`}
                className="relative top-0 [transform:scale(var(--row-scale-red))] transition ease-out duration-200 py-4 -my-10 flex flex-row justify-center items-center"
              >
                {redCards
                  .slice(numCardsPerRow * rowNum, numCardsPerRow * (rowNum + 1))
                  .map((card, redKey) => (
                    <TCGCard
                      title={card.title}
                      description={card.description}
                      variant={card.variant}
                      rarity={card.rarity}
                      image={card.image}
                      key={`red-card-${redKey}`}
                      onClose={function(){
                        // On card closure, remove card from redCards
                        setRedCards(
                          redCards.filter((testCard) => testCard != card),
                        )

                        // update parseParams
                        setRedParseParams((prev) => {
                          return {
                            score: prev.score,
                            mods: prev.mods,
                            map: prev.map,
                            bpm: prev.bpm,
                            ar: prev.ar,
                            hand: JSON.stringify([
                              ...(redCards.filter((testCard) => testCard != card)),
                            ])
                          }
                        });
                      }}
                      onCardClick={() => onRedCardClick(card)}
                    />
                  ))}
              </div>
            ))}
        </div>
        <div className="relative flex flex-col h-full w-1/2 justify-center items-center">
          {blueCardView && (
            <div
              onClick={() => setBlueCardView(false)}
              className="absolute h-full w-full bg-gray-900 bg-opacity-70 z-10 flex justify-center items-center"
            >
              <div className="[transform:scale(2)]">
                <TCGCard
                  title={currentViewBlueCard.title}
                  description={currentViewBlueCard.description}
                  variant={currentViewBlueCard.variant}
                  rarity={currentViewBlueCard.rarity}
                  image={currentViewBlueCard.image}
                  onClose={() => setBlueCardView(false)}
                />
              </div>
            </div>
          )}
          {Array(numRows)
            .fill(undefined)
            .map((_, rowNum) => (
              <div
                key={`row-${rowNum}`}
                className="relative top-0 [transform:scale(var(--row-scale-blue))] transition ease-out duration-200 py-4 -my-10 flex flex-row justify-center items-center"
              >
                {blueCards
                  .slice(numCardsPerRow * rowNum, numCardsPerRow * (rowNum + 1))
                  .map((card, blueKey) => (
                    <TCGCard
                      title={card.title}
                      description={card.description}
                      variant={card.variant}
                      rarity={card.rarity}
                      image={card.image}
                      key={`blue-card-${blueKey}`}
                      onClose={function(){
                        // On card closure, remove card from redCards
                        setBlueCards(
                          blueCards.filter((testCard) => testCard != card),
                        )

                        // update parseParams
                        setBlueParseParams((prev) => {
                          return {
                            score: prev.score,
                            mods: prev.mods,
                            map: prev.map,
                            bpm: prev.bpm,
                            ar: prev.ar,
                            hand: JSON.stringify([
                              ...(blueCards.filter((testCard) => testCard != card)),
                            ])
                          }
                        });
                      }}
                      onCardClick={() => onBlueCardClick(card)}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 w-[60em]">
        <ComboBox
          title="Card Title"
          listData={card_database.map((card) => card.title)}
          query={cardQuery}
          setQuery={setCardQuery}
          filtering={true}
        />
        <ComboBox
          title="Card Variant"
          listData={cardVariants}
          query={variantQuery}
          setQuery={setVariantQuery}
          filtering={false}
        />
        <button
          className="bg-red-400 rounded-lg p-2 hover:bg-red-300 select-none"
          onClick={() => {
            const target = card_database.filter(
              (card) => card.title === cardQuery,
            );
            if (target.length < 1) {
              alert("No such card");
              return;
            }
            if (redCards.length > numCardsPerRow * numRows - 1) {
              alert("Card limit reached");
              return;
            }
            setRedCards([
              ...redCards,
              { ...target[0], variant: variantQuery, id: redCardID },
            ]);
            setRedCardID(redCardID + 1);

            // changes redParseParams to include updated cards
            setRedParseParams((prev) => {
              return {
                score: prev.score,
                mods: prev.mods,
                map: prev.map,
                bpm: prev.bpm,
                ar: prev.ar,
                hand: JSON.stringify([
                  ...redCards,
                  { ...target[0], variant: variantQuery, id: redCardID },
                ])
              }
            });

          }}
        >
          Add Red Card
        </button>
        <button
          className="bg-blue-400 rounded-lg p-2 hover:bg-blue-300 select-none"
          onClick={() => {
            const target = card_database.filter(
              (card) => card.title === cardQuery,
            );
            if (target.length < 1) {
              alert("No such card");
              return;
            }
            if (blueCards.length > numCardsPerRow * numRows - 1) {
              alert("Card limit reached");
              return;
            }
            setBlueCards([
              ...blueCards,
              { ...target[0], variant: variantQuery, id: blueCardID },
            ]);
            setBlueCardID(blueCardID + 1);

            // changes redParseParams to include updated cards
            setBlueParseParams((prev) => {
              return {
                score: prev.score,
                mods: prev.mods,
                map: prev.map,
                bpm: prev.bpm,
                ar: prev.ar,
                hand: JSON.stringify([
                  ...blueCards,
                  { ...target[0], variant: variantQuery, id: blueCardID },
                ])
              }
            });
          }}
        >
          Add Blue Card
        </button>
        
        <div
        className ="flex items-center mb-4 columns-2">
          <label>
            <input 
            onChange = {() => setRedParseParams((prev) => {
              return {
                score: prev.score,
                mods: prev.mods.includes("hd") ? (prev.mods.length == 1 ? ["nm"] : prev.mods.filter((mod) => mod !== "hd")) : (prev.mods.includes("nm") ? ["hd"] : [...prev.mods, "hd"]),
                map: prev.map,
                bpm: prev.bpm,
                ar: prev.ar,
                hand: prev.hand
              }
            })}
            value="hd"
            type="checkbox" 
            />HD
          </label>
          <label>
            <input 
            onChange = {() => setRedParseParams((prev) => {
              return {
                score: prev.score,
                mods: prev.mods.includes("hr") ? (prev.mods.length == 1 ? ["nm"] : prev.mods.filter((mod) => mod !== "hr")) : (prev.mods.includes("nm") ? ["hr"] : [...prev.mods, "hr"]),
                map: prev.map,
                bpm: prev.bpm,
                ar: prev.ar,
                hand: prev.hand
              }
            })}
            value="hr"
            type="checkbox" 
            />HR
          </label>
          <label>
            <input 
            onChange = {() => setRedParseParams((prev) => {
              return {
                score: prev.score,
                mods: prev.mods.includes("dt") ? (prev.mods.length == 1 ? ["nm"] : prev.mods.filter((mod) => mod !== "dt")) : (prev.mods.includes("nm") ? ["dt"] : [...prev.mods, "dt"]),
                map: prev.map,
                bpm: prev.bpm,
                ar: prev.ar,
                hand: prev.hand
              }
            })}
            value="dt"
            type="checkbox" 
            />DT
          </label>
          <label className="font-bold block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Score: 
            <input
            type='number'
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex. 727727"
            value={redParseParams.score}
            // e is the change event of this input
            onChange = {(e) => setRedParseParams((prev) => {
              return {
                score: e.target.value,
                mods: prev.mods,
                map: prev.map,
                bpm: prev.bpm,
                ar: prev.ar,
                hand: prev.hand
              }
            })}
            />
          </label>
          <label className="font-bold block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Map: 
            <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex. dt1"
            value={redParseParams.map}
            // e is the change event of this input
            onChange = {(e) => setRedParseParams((prev) => {
              return {
                score: prev.score,
                mods: prev.mods,
                map: e.target.value.toLowerCase(),
                bpm: prev.bpm,
                ar: prev.ar,
                hand: prev.hand
              }
            })}
            />
          </label>
          <label className="font-bold block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            BPM: 
            <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex. 180"
            type='number'
            value={redParseParams.bpm}
            // e is the change event of this input
            onChange = {(e) => setRedParseParams((prev) => {
              return {
                score: prev.score,
                mods: prev.mods,
                map: prev.map,
                bpm: e.target.value,
                ar: prev.ar,
                hand: prev.hand
              }
            })}
            />
          </label>
          <label className="font-bold block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            AR: 
            <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex. 9.3"
            type="number"
            value={redParseParams.ar}
            // e is the change event of this input
            onChange = {(e) => setRedParseParams((prev) => {
              return {
                score: prev.score,
                mods: prev.mods,
                map: prev.map,
                bpm: prev.bpm,
                ar: e.target.value,
                hand: prev.hand
              }
            })}
            />
          </label>

        </div>



        <div
        className ="flex items-center mb-4 columns-2">
          <label>
            <input 
            onChange = {() => setBlueParseParams((prev) => {
              return {
                score: prev.score,
                mods: prev.mods.includes("hd") ? (prev.mods.length == 1 ? ["nm"] : prev.mods.filter((mod) => mod !== "hd")) : (prev.mods.includes("nm") ? ["hd"] : [...prev.mods, "hd"]),
                map: prev.map,
                bpm: prev.bpm,
                ar: prev.ar,
                hand: prev.hand
              }
            })}
            value="hd"
            type="checkbox" 
            />HD
          </label>
          <label>
            <input 
            onChange = {() => setBlueParseParams((prev) => {
              return {
                score: prev.score,
                mods: prev.mods.includes("hr") ? (prev.mods.length == 1 ? ["nm"] : prev.mods.filter((mod) => mod !== "hr")) : (prev.mods.includes("nm") ? ["hr"] : [...prev.mods, "hr"]),
                map: prev.map,
                bpm: prev.bpm,
                ar: prev.ar,
                hand: prev.hand
              }
            })}
            value="hr"
            type="checkbox" 
            />HR
          </label>
          <label>
            <input 
            onChange = {() => setBlueParseParams((prev) => {
              return {
                score: prev.score,
                mods: prev.mods.includes("dt") ? (prev.mods.length == 1 ? ["nm"] : prev.mods.filter((mod) => mod !== "dt")) : (prev.mods.includes("nm") ? ["dt"] : [...prev.mods, "dt"]),
                map: prev.map,
                bpm: prev.bpm,
                ar: prev.ar,
                hand: prev.hand
              }
            })}
            value="dt"
            type="checkbox" 
            />DT
          </label>
          <label className="font-bold block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Score: 
            <input
            type='number'
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex. 727727"
            value={blueParseParams.score}
            // e is the change event of this input
            onChange = {(e) => setBlueParseParams((prev) => {
              return {
                score: e.target.value,
                mods: prev.mods,
                map: prev.map,
                bpm: prev.bpm,
                ar: prev.ar,
                hand: prev.hand
              }
            })}
            />
          </label>
          <label className="font-bold block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Map: 
            <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex. dt1"
            value={blueParseParams.map}
            // e is the change event of this input
            onChange = {(e) => setBlueParseParams((prev) => {
              return {
                score: prev.score,
                mods: prev.mods,
                map: e.target.value.toLowerCase(),
                bpm: prev.bpm,
                ar: prev.ar,
                hand: prev.hand
              }
            })}
            />
          </label>
          <label className="font-bold block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            BPM: 
            <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex. 180"
            type='number'
            value={blueParseParams.bpm}
            // e is the change event of this input
            onChange = {(e) => setBlueParseParams((prev) => {
              return {
                score: prev.score,
                mods: prev.mods,
                map: prev.map,
                bpm: e.target.value,
                ar: prev.ar,
                hand: prev.hand
              }
            })}
            />
          </label>
          <label className="font-bold block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            AR: 
            <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex. 9.3"
            type="number"
            value={blueParseParams.ar}
            // e is the change event of this input
            onChange = {(e) => setBlueParseParams((prev) => {
              return {
                score: prev.score,
                mods: prev.mods,
                map: prev.map,
                bpm: prev.bpm,
                ar: e.target.value,
                hand: prev.hand
              }
            })}
            />
          </label>

        </div>
        <button className="bg-gray-400 rounded-lg p-2 hover:bg-gray-200 select-none col-span-2"
        onClick={fetchData}><b>Calculate Score</b></button>

        <div className="text-xl rounded-lg p-2 font-semibold bg-red-400 shadow">
          <div className="flex justify-center">Red Score</div>
          <div className="flex justify-center">{Math.round(redScore)}</div>
        </div>

        <div className="text-xl rounded-lg p-2 font-semibold bg-blue-400 shadow">
          <div className="flex justify-center">Blue Score</div>
          <div className="flex justify-center">{Math.round(blueScore)}</div>
        </div>

      </div>
    </main>
  );
}
