"use client"
import TCGCard from './_components/TCGCard/page.tsx';
import ComboBox from './_components/ComboBox/page.tsx';
import card_database from './_data/card_database.json';
import { useState, useEffect } from 'react';

export default function Home() {
	const [cardQuery, setCardQuery] = useState('');
	const [variantQuery, setVariantQuery] = useState('');
	const [redCards, setRedCards] = useState([]);
	const [blueCards, setBlueCards] = useState([]);
	const [redCardID, setRedCardID] = useState(0);
	const [blueCardID, setBlueCardID] = useState(0);

	const numCardsPerRow = 9;
	const numRows = 3;
	const cardVariants = ['Normal', 'Holographic', 'Polychromatic'];

	const onCardClick = (card) => {
		alert(JSON.stringify(card, null, 2));
	}
	
	useEffect(() => {
		const scaleFactor = Math.max(Math.min(-(1/8)*(redCards.length - 5) + 1.2, 1.2), 0.7);
		document.body.style.setProperty("--row-scale-red", `${scaleFactor}`);
	},[redCards.length]);
	
	useEffect(() => {
		const scaleFactor = Math.max(Math.min(-(1/8)*(blueCards.length - 5) + 1.2, 1.2), 0.7);
		document.body.style.setProperty("--row-scale-blue", `${scaleFactor}`);
	},[blueCards.length]);
  return (
	<main className="flex flex-col gap-5">
		<div className="flex overflow-hidden bg-gradient-to-r from-red-500 from-40% to-blue-500 to-60% h-[960px] w-[2560px] min-h-[960px] min-w-[2560px] max-h-[960px] max-w-[2560px]">
			<div className="flex flex-col h-full w-1/2 justify-center items-center">
				{Array(numRows).fill(undefined).map((_, rowNum) => <div className="relative top-0 [transform:scale(var(--row-scale-red))] transition ease-out duration-200 py-4 -my-10 flex flex-row justify-center items-center">
					{redCards.slice(numCardsPerRow * rowNum, numCardsPerRow * (rowNum + 1)).map((card) => <TCGCard title={card.title} description={card.description} variant={card.variant} onClose={() => setRedCards(redCards.filter((testCard) => testCard != card))} onCardClick={() => onCardClick(card)}/>)}
				</div>)}
			</div>
			<div className="flex flex-col h-full w-1/2 justify-center items-center">
				{Array(numRows).fill(undefined).map((_, rowNum) => <div className="relative top-0 [transform:scale(var(--row-scale-blue))] transition ease-out duration-200 py-4 -my-10 flex flex-row justify-center items-center">
					{blueCards.slice(numCardsPerRow * rowNum, numCardsPerRow * (rowNum + 1)).map((card) => <TCGCard title={card.title} description={card.description} variant={card.variant} onClose={() => setBlueCards(blueCards.filter((testCard) => testCard != card))} onCardClick={() => onCardClick(card)}/>)}
				</div>)}
			</div>
		</div>
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
		<div className="flex gap-5">
			<button 
			className="bg-red-400 rounded-lg p-2 hover:bg-red-300"
			onClick={() => {
				const target = card_database.filter((card) => card.title === cardQuery);
				if(target.length < 1) {
					alert('No such card');
					return;
				}
				if(redCards.length > numCardsPerRow * numRows - 1) {
					alert('Card limit reached');
					return;
				}
				setRedCards([...redCards, {...target[0], variant: variantQuery, id: redCardID}]);
				setRedCardID(redCardID + 1);
			}}>
				Add Red Card
			</button>
			<button 
			className="bg-blue-400 rounded-lg p-2 hover:bg-blue-300"
			onClick={() => {
				const target = card_database.filter((card) => card.title === cardQuery);
				if(target.length < 1) {
					alert('No such card');
					return;
				}
				if(blueCards.length > numCardsPerRow * numRows - 1) {
					alert('Card limit reached');
					return;
				}
				setBlueCards([...blueCards, {...target[0], variant: variantQuery, id: blueCardID}]);
				setBlueCardID(blueCardID + 1);
			}}>
				Add Blue Card
			</button>
		</div>
	</main>
  );
}
