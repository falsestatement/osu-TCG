"use client"
import TCGCard from './_components/TCGCard/page.tsx';
import { useState } from 'react';
export default function Home() {
	const [numRed, setNumRed] = useState(0);
	const [numBlue, setNumBlue] = useState(0);
  return (
    <main className="min-h-screen items-center justify-between">
    	<div className="flex justify-between">
		<button onClick={() => setNumRed(numRed + 1)}>Add Red Card</button>
		<button onClick={() => setNumRed(numRed - 1)}>Remove Red Card</button>
		<button onClick={() => setNumBlue(numBlue + 1)}>Add Blue Card</button>
		<button onClick={() => setNumBlue(numBlue - 1)}>Remove Blue Card</button>
	</div>
	<div className="grid grid-cols-2">
		<div className="my-2 flex flex-row bg-red-200">
			{[...Array(numRed)].fill(undefined).slice(0,7).map((_) => <TCGCard/>)}
		</div>
		<div className="my-2 flex flex-row bg-blue-200">
			{[...Array(numBlue)].fill(undefined).slice(0,7).map((_) => <TCGCard/>)}
		</div>
		<div className="my-2 flex flex-row bg-red-200">
			{[...Array(numRed)].fill(undefined).slice(7,14).map((_) => <TCGCard/>)}
		</div>
		<div className="my-2 flex flex-row bg-blue-200">
			{[...Array(numBlue)].fill(undefined).slice(7,14).map((_) => <TCGCard/>)}
		</div>
		<div className="my-2 flex flex-row bg-red-200">
			{[...Array(numRed)].fill(undefined).slice(14,21).map((_) => <TCGCard/>)}
		</div>
		<div className="my-2 flex flex-row bg-blue-200">
			{[...Array(numBlue)].fill(undefined).slice(14,21).map((_) => <TCGCard/>)}
		</div>
	</div>
    </main>
  );
}
