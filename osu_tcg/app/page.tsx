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
                      onClose={() =>
                        setRedCards(
                          redCards.filter((testCard) => testCard != card),
                        )
                      }
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
                      onClose={() =>
                        setBlueCards(
                          blueCards.filter((testCard) => testCard != card),
                        )
                      }
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
          }}
        >
          Add Blue Card
        </button>
      </div>
    </main>
  );
}
