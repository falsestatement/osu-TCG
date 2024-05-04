"use client"
import TCGCard from './_components/TCGCard/page.tsx';
import { useState } from 'react';
export default function Home() {
	const [numRed, setNumRed] = useState(0);
	const [numBlue, setNumBlue] = useState(0);
  return (
    <main className="min-h-screen items-center justify-between">
    	<button onClick={() => setNumRed(numRed + 1)}>Add Red Card</button>
    	<button onClick={() => setNumBlue(numBlue + 1)}>Add Blue Card</button>
	<div className="grid grid-cols-2">
		<div className="flex flex-row bg-red-200">
			{[...Array(numRed)].fill(undefined).map((_) => <TCGCard/>)}
		</div>
		<div className="flex flex-row bg-blue-200">
			{[...Array(numBlue)].fill(undefined).map((_) => <TCGCard/>)}
		</div>
	</div>
    </main>
  );
}
