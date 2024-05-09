"use client"
import TCGCard from './_components/TCGCard/page.tsx';
import { useState, useEffect } from 'react';
export default function Home() {
	const [numRed, setNumRed] = useState(0);
	const [numBlue, setNumBlue] = useState(0);
	const numCardsPerRow = 9;

	useEffect(() => {
		const scaleFactor = Math.max(Math.min(-(1/8)*(numRed - 5) + 1, 1), 0.7);
		document.body.style.setProperty("--row-scale-red", `${scaleFactor}`);
	},[numRed]);
	
	useEffect(() => {
		const scaleFactor = Math.max(Math.min(-(1/8)*(numBlue - 5) + 1, 1), 0.7);
		document.body.style.setProperty("--row-scale-blue", `${scaleFactor}`);
	},[numBlue]);
  return (
	<main>
		<div className="overflow-hidden bg-gradient-to-r from-red-500 from-40% to-blue-500 to-60% h-[960px] w-[2560px] min-h-[960px] min-w-[2560px] max-h-[960px] max-w-[2560px]">
			<div className="grid grid-cols-2 h-full w-full">
				<div className="relative top-0 z-10 [transform:scale(var(--row-scale-red))] transition ease-out duration-200 py-4 flex flex-row justify-center items-center h-full w-full">
					{[...Array(numRed)].fill(undefined).slice(0, numCardsPerRow).map((_) => <TCGCard/>)}
				</div>
				<div className="relative top-0 z-10 [transform:scale(var(--row-scale-blue))] transition ease-out duration-200 py-4 flex flex-row justify-center items-center h-full w-full">
					{[...Array(numBlue)].fill(undefined).slice(0, numCardsPerRow).map((_) => <TCGCard/>)}
				</div>
				<div className="relative -top-28 [transform:scale(var(--row-scale-red))] transition ease-out duration-200 py-4 flex flex-row justify-center items-center h-full w-full">
					{[...Array(numRed)].fill(undefined).slice(numCardsPerRow, 2 * numCardsPerRow).map((_) => <TCGCard/>)}
				</div>
				<div className="relative -top-28 [transform:scale(var(--row-scale-blue))] transition ease-out duration-200 py-4 flex flex-row justify-center items-center h-full w-full">
					{[...Array(numBlue)].fill(undefined).slice(numCardsPerRow,2 * numCardsPerRow).map((_) => <TCGCard/>)}
				</div>
				<div className="relative -top-56 [transform:scale(var(--row-scale-red))] transition ease-out duration-200 py-4 flex flex-row justify-center items-center h-full w-full">
					{[...Array(numRed)].fill(undefined).slice(2 * numCardsPerRow, 3 * numCardsPerRow).map((_) => <TCGCard/>)}
				</div>
				<div className="relative -top-56 [transform:scale(var(--row-scale-blue))] transition ease-out duration-200 py-4 flex flex-row justify-center items-center h-full w-full">
					{[...Array(numBlue)].fill(undefined).slice(2 * numCardsPerRow, 3 * numCardsPerRow).map((_) => <TCGCard/>)}
				</div>
			</div>
		</div>
		<div className="flex justify-between">
			<button onClick={() => setNumRed(numRed < numCardsPerRow * 3 ? numRed + 1 : numRed)}>Add Red Card</button>
			<button onClick={() => setNumRed(numRed > 0 ? numRed - 1 : numRed)}>Remove Red Card</button>
			<button onClick={() => setNumBlue(numBlue < numCardsPerRow * 3 ? numBlue + 1 : numBlue)}>Add Blue Card</button>
			<button onClick={() => setNumBlue(numBlue > 0 ? numBlue - 1 : numBlue)}>Remove Blue Card</button>
		</div>
	</main>
  );
}
