import TCGCard from './_components/TCGCard/page.tsx'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    	<h1>Hello World</h1>
	<TCGCard/>
	<TCGCard/>
	<TCGCard/>
	<TCGCard/>
	<TCGCard/>
    </main>
  );
}
