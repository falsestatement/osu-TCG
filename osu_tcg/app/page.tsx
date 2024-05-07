"use client"
import TCGCard from './_components/TCGCard/page.tsx';
import { useState } from 'react';
export default function Home() {
	const [numRed, setNumRed] = useState(0);
	const [numBlue, setNumBlue] = useState(0);
	const numCardsPerRow = 9;
  return (
	<main>
		<div className="overflow-hidden bg-gradient-to-r from-red-500 from-40% to-blue-500 to-60% h-[960px] w-[2560px] min-h-[960px] min-w-[2560px] max-h-[960px] max-w-[2560px]">
			<div className="grid grid-cols-2 h-full w-full">
				<div className="scale-150 my-2 py-4 flex flex-row justify-center items-center h-full w-full">
					{[...Array(numRed)].fill(undefined).slice(0, numCardsPerRow).map((_) => <TCGCard/>)}
				</div>
				<div className="my-2 py-4 flex flex-row justify-center items-center h-full w-full">
					{[...Array(numBlue)].fill(undefined).slice(0, numCardsPerRow).map((_) => <TCGCard/>)}
				</div>
				<div className="my-2 py-4 flex flex-row justify-center items-center h-full w-full">
					{[...Array(numRed)].fill(undefined).slice(numCardsPerRow, 2 * numCardsPerRow).map((_) => <TCGCard/>)}
				</div>
				<div className="my-2 py-4 flex flex-row justify-center items-center h-full w-full">
					{[...Array(numBlue)].fill(undefined).slice(numCardsPerRow,2 * numCardsPerRow).map((_) => <TCGCard/>)}
				</div>
				<div className="my-2 py-4 flex flex-row justify-center items-center h-full w-full">
					{[...Array(numRed)].fill(undefined).slice(2 * numCardsPerRow, 3 * numCardsPerRow).map((_) => <TCGCard/>)}
				</div>
				<div className="my-2 py-4 flex flex-row justify-center items-center h-full w-full">
					{[...Array(numBlue)].fill(undefined).slice(2 * numCardsPerRow, 3 * numCardsPerRow).map((_) => <TCGCard/>)}
				</div>
			</div>
		</div>
		<div className="flex justify-between">
			<button onClick={() => setNumRed(numRed + 1)}>Add Red Card</button>
			<button onClick={() => setNumRed(numRed - 1)}>Remove Red Card</button>
			<button onClick={() => setNumBlue(numBlue + 1)}>Add Blue Card</button>
			<button onClick={() => setNumBlue(numBlue - 1)}>Remove Blue Card</button>
		</div>
	</main>
  );
}
