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

	const numCardsPerRow = 9;
	const cardVariants = ['Normal', 'Holographic', 'Polychromatic'];
	
	useEffect(() => {
		const scaleFactor = Math.max(Math.min(-(1/8)*(redCards.length - 5) + 1, 1), 0.7);
		document.body.style.setProperty("--row-scale-red", `${scaleFactor}`);
	},[redCards.length]);
	
	useEffect(() => {
		const scaleFactor = Math.max(Math.min(-(1/8)*(blueCards.length - 5) + 1, 1), 0.7);
		document.body.style.setProperty("--row-scale-blue", `${scaleFactor}`);
	},[blueCards.length]);
  return (
	<main className="flex flex-col gap-5">
		<div className="overflow-hidden bg-gradient-to-r from-red-500 from-40% to-blue-500 to-60% h-[960px] w-[2560px] min-h-[960px] min-w-[2560px] max-h-[960px] max-w-[2560px]">
			<div className="grid grid-cols-2 h-full w-full">
				<div className="relative top-0 z-10 [transform:scale(var(--row-scale-red))] transition ease-out duration-200 py-4 flex flex-row justify-center items-center h-full w-full">
					{redCards.slice(0, numCardsPerRow).map((card) => <TCGCard title={card.title} description={card.description} variant={card.variant}/>)}
				</div>
				<div className="relative top-0 z-10 [transform:scale(var(--row-scale-blue))] transition ease-out duration-200 py-4 flex flex-row justify-center items-center h-full w-full">
					{blueCards.slice(0, numCardsPerRow).map((card) => <TCGCard title={card.title} description={card.description} variant={card.variant}/>)}
				</div>
				<div className="relative -top-28 [transform:scale(var(--row-scale-red))] transition ease-out duration-200 py-4 flex flex-row justify-center items-center h-full w-full">
					{redCards.slice(numCardsPerRow, 2 * numCardsPerRow).map((card) => <TCGCard title={card.title} description={card.description} variant={card.variant}/>)}
				</div>
				<div className="relative -top-28 [transform:scale(var(--row-scale-blue))] transition ease-out duration-200 py-4 flex flex-row justify-center items-center h-full w-full">
					{blueCards.slice(numCardsPerRow,2 * numCardsPerRow).map((card) => <TCGCard title={card.title} description={card.description} variant={card.variant}/>)}
				</div>
				<div className="relative -top-56 [transform:scale(var(--row-scale-red))] transition ease-out duration-200 py-4 flex flex-row justify-center items-center h-full w-full">
					{redCards.slice(2 * numCardsPerRow, 3 * numCardsPerRow).map((card) => <TCGCard title={card.title} description={card.description} variant={card.variant}/>)}
				</div>
				<div className="relative -top-56 [transform:scale(var(--row-scale-blue))] transition ease-out duration-200 py-4 flex flex-row justify-center items-center h-full w-full">
					{blueCards.slice(2 * numCardsPerRow, 3 * numCardsPerRow).map((card) => <TCGCard title={card.title} description={card.description} variant={card.variant}/>)}
				</div>
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
		<div className="grid grid-cols-2 gap-5 w-[25em]">
			<button 
			className="bg-red-200 rounded-lg p-2 hover:bg-red-300"
			onClick={() => {
				const target = card_database.filter((card) => card.title === cardQuery);
				if(target.length < 1) {
					alert('No such card');
					return;
				}
				setRedCards([...redCards, {...target[0], variant: variantQuery}]);
			}}>
				Add Red Card
			</button>
			<button 
			className="bg-blue-200 rounded-lg p-2 hover:bg-blue-300"
			onClick={() => {
				const target = card_database.filter((card) => card.title === cardQuery);
				if(target.length < 1) {
					alert('No such card');
					return;
				}
				setBlueCards([...blueCards, {...target[0], variant: variantQuery}]);
			}}>
				Add Blue Card
			</button>
			<button 
			className="bg-red-400 rounded-lg p-2 hover:bg-red-300"
			onClick={() => {
				if(redCards.length < 1)
					return
				setRedCards(redCards.slice(0, redCards.length - 1))
			}}>
				Remove Red Card
			</button>
			<button 
			className="bg-blue-400 rounded-lg p-2 hover:bg-blue-300"
			onClick={() => {
				if(blueCards.length < 1)
					return
				setBlueCards(blueCards.slice(0, blueCards.length - 1))
			}}>
				Remove Blue Card
			</button>
		</div>
	</main>
  );
}
