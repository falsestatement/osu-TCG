import { useState, useRef } from 'react';

const TCGCard = () => {
	// cardVariants: none, holofoil, polychrome
	// rarityVariants: common, uncommon, rare
	const [counter, setCounter] = useState(0);
	const boundingRef = useRef<DOMRect | null>(null);
	const cardVariant = "holofoil";
	const rarityVariant = "rare"

	document.body.style.setProperty("--chroma-shift", '-200px');
	document.body.style.setProperty("--before-glare-shift", '-60px');
	document.body.style.setProperty("--after-glare-shift", '-120px');
	document.body.style.setProperty('--poly-x', '-125%');
	document.body.style.setProperty('--poly-y', '-105%');
	return (
		<div 
		onMouseEnter={(e) => {
			boundingRef.current = e.currentTarget.getBoundingClientRect();	
		}}
		onMouseLeave={() => {boundingRef.current = null}}
		onMouseMove={(e) => {
			const x = e.clientX - boundingRef.current.left;
			const y = e.clientY - boundingRef.current.top + 10;

			const normX = x / boundingRef.current.width;
			const normY = y / boundingRef.current.height;

			e.currentTarget.style.setProperty("--chroma-shift", `${-normY*400}px`);
			e.currentTarget.style.setProperty("--before-glare-shift", `${-normX*120}px`);
			e.currentTarget.style.setProperty("--after-glare-shift", `${normX*240-240}px`);
			e.currentTarget.style.setProperty("--poly-x", `${-(normX+2)*50}%`);
			e.currentTarget.style.setProperty("--poly-y", `${-(normY+1)*70}%`);
			e.currentTarget.style.setProperty("--rot-x", `${-(normY-0.5)*25}deg`);
			e.currentTarget.style.setProperty("--rot-y", `${(normX-0.5)*25}deg`);

			console.table({
				MouseX: normX,
				MouseY: normY,
			});
		}}
		className="group hover:[transform:perspective(500px)_rotateY(var(--rot-y))_rotateX(var(--rot-x))] relative [flex -ml-[62px] first:ml-0 min-w-44 min-h-64 w-44 h-64 bg-gradient-to-br from-pink-400 to-violet-600 rounded-lg p-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.35)] left-0 top-0 transition-[left,top] duration-200 ease-in-out hover:-top-2 peer peer-hover:relative peer-hover:left-[72px]">
			<div className="flex relative flex-col justify-between bg-[url('https://cdn.discordapp.com/attachments/1229567681217429659/1237587687079284796/omega_tringle.jpg?ex=663c30d9&is=663adf59&hm=863f802d21fad273ec64fd07adcb35d936b14fabe900c650fdca4e59bb042ca0&')] bg-[length:75%] brightness-[1.1] w-full h-full rounded-md p-2">
				<div className={cardVariant == "holofoil" ? "absolute pointer-events-none h-full w-full rounded-lg top-0 left-0 bg-[linear-gradient(rgba(255,86,86,1)_0%,rgba(255,207,78,1)_15%,rgba(246,255,61,1)_20%,rgba(194,255,71,1)_35%,rgba(77,255,152,1)_52%,rgba(117,177,255,1)_69%,rgba(174,91,255,1)_85%,rgba(255,111,200,1)_97%),repeating-linear-gradient(133deg,#0e152e_0%,hsl(180,10%,60%)_3.8%,hsl(180,29%,66%)_4.5%,hsl(180,10%,60%)_5.2%,#0e152e_10%,#0e152e_12%)] bg-[length:100%_200%] bg-[0%_var(--chroma-shift),0%_var(--before-glare-shift)] bg-blend-hue brightness-[0.5] contrast-[2] saturate-[1.5] mix-blend-color-dodge after:content-[''] after:block after:absolute after:h-full after:w-full after:rounded-lg after:top-0 after:left-0 after:bg-[linear-gradient(rgba(255,86,86,1)_0%,rgba(255,207,78,1)_15%,rgba(246,255,61,1)_20%,rgba(194,255,71,1)_35%,rgba(77,255,152,1)_52%,rgba(117,177,255,1)_69%,rgba(174,91,255,1)_85%,rgba(255,111,200,1)_97%),repeating-linear-gradient(133deg,#0e152e_0%,hsl(180,10%,60%)_3.8%,hsl(180,29%,66%)_4.5%,hsl(180,10%,60%)_5.2%,#0e152e_10%,#0e152e_12%)] after:bg-[length:200%_300%] after:bg-[0%_var(--chroma-shift),-60px_var(--after-glare-shift)] after:bg-blend-hue after:brightness-[0.9] after:contrast-[1.2] after:saturate-[1.6] after:mix-blend-exclusion before:absolute before:h-full before:w-full before:rounded-lg before:top-0 before:left-0 before:bg-[url('https://cdn.discordapp.com/attachments/1229567681217429659/1237596606434639973/omega_triangle_contrast.jpg?ex=663c3928&is=663ae7a8&hm=159a8a1a73646e39bfd04dd2ded618d3d188d6ed5944172e6292a1673189e2c0&')] before:bg-[length:75%] before:mix-blend-overlay" : "hidden"}/>
				<div className={cardVariant == "polychrome" ? "absolute pointer-events-none h-full w-full top-0 left-0 rounded-lg bg-[url('https://cdn.discordapp.com/attachments/1229567681217429659/1237596606434639973/omega_triangle_contrast.jpg?ex=663c3928&is=663ae7a8&hm=159a8a1a73646e39bfd04dd2ded618d3d188d6ed5944172e6292a1673189e2c0&'),repeating-radial-gradient(75%_75%_at_var(--poly-x)_var(--poly-y),rgba(255,86,86,1),rgba(255,207,78,1),rgba(246,255,61,1),rgba(194,255,71,1),rgba(77,255,152,1),rgba(117,177,255,1),rgba(174,91,255,1),rgba(255,111,200,1)_170px)] bg-[length:75%,150%_100%] bg-blend-overlay brightness-[0.4] contrast-[1.7] saturate-[1.2] mix-blend-color-dodge" : "hidden"}/>
				<button className="absolute hidden text-white bg-pink-700 group-hover:flex -right-3 -top-3 bg-pink-700 w-5 h-5 justify-center items-center rounded-full text-sm hover:bg-pink-500">x</button>
				<div className="flex flex-col grow">
					<div className={
						rarityVariant == "common" ? "bg-gradient-to-r from-lime-500 to-green-500 rounded-md flex justify-center items-center border-solid border-2 border-lime-700 select-none font-bold"
					  : rarityVariant == "uncommon" ? "bg-gradient-to-r from-sky-500 to-blue-500 rounded-md flex justify-center items-center border-solid border-2 border-sky-700 select-none font-bold"
					  : rarityVariant == "rare" ? "bg-gradient-to-r from-pink-500 to-red-500 rounded-md flex justify-center items-center border-solid border-2 border-pink-700 select-none font-bold"
					  : "hidden"
					  }>
						Card Name
					</div>
					
					<div className="bg-white my-2 h-2/5 rounded-md flex justify-center items-center bg-[url('https://i.pinimg.com/originals/6a/db/ea/6adbea3b760d8b09f2ea42d948e3db78.jpg')] bg-cover border-solid border-2 border-violet-700"/>

					<div className="text-[10px] text-center select-none">
						Some very long descriptor text
						here including some random information
						about the specified card etc etc
					</div>
				</div>
				<div className="group-hover:flex group-hover:justify-between">
					<button onClick={() => setCounter((prev) => prev > 0 ? prev - 1 : prev)} className="p-2 mr-2 hidden bg-pink-200 rounded-lg w-5 h-5 group-hover:flex justify-center items-center hover:bg-pink-100">{"-"}</button>
					<input value={counter} onChange={(e) => setCounter(+e.target.value)} type="number" className="font-bold w-full group-hover:text-center rounded-lg bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "/>
					<button onClick={() => setCounter((prev) => prev + 1)} className="p-2 ml-2 hidden bg-pink-200 rounded-lg w-5 h-5 group-hover:flex justify-center items-center hover:bg-pink-100">{"+"}</button>
				</div>

			</div>
		</div>
	);
}

export default TCGCard;
