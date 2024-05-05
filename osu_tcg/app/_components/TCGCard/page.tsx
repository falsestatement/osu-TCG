import { useState } from 'react';

const TCGCard = () => {
	const [counter, setCounter] = useState(0);
	return (
		<div className="group [flex -ml-32 first:ml-0 min-w-44 min-h-64 w-44 h-64 bg-gradient-to-br from-pink-400 to-violet-600 rounded-lg p-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.35)] transition ease-in-out duration-200 hover:-translate-y-2 peer peer-hover:relative peer-hover:transition peer-hover:ease-in-out peer-hover:duration-200 peer-hover:translate-x-32">
			<div className="flex flex-col justify-between bg-pink-300 w-full h-full rounded-md p-2">
				<button className="absolute hidden text-white bg-pink-700 group-hover:flex -right-1 -top-1 bg-white w-5 h-5 justify-center items-center rounded-full text-sm hover:bg-pink-500">x</button>
				<div className="flex flex-col grow">
					<div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-md flex justify-center items-center border-solid border-2 border-pink-700">
						Card Name
					</div>
					<div className="bg-white my-2 h-2/5 rounded-md flex justify-center items-center">
						image here
					</div>

					<div className="text-[10px] text-center">
						Some very long descriptor text
						here including some random information
						about the specified card etc etc
					</div>
				</div>
				<div className="group-hover:flex group-hover:justify-between">
					<button onClick={() => setCounter((prev) => prev > 0 ? prev - 1 : prev)} className="p-2 mr-2 hidden bg-pink-200 rounded-lg w-5 h-5 group-hover:flex justify-center items-center hover:bg-pink-100">{"-"}</button>
					<input value={counter} onChange={(e) => setCounter(+e.target.value)} type="number" className="w-full group-hover:text-center rounded-lg bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "/>
					<button onClick={() => setCounter((prev) => prev + 1)} className="p-2 ml-2 hidden bg-pink-200 rounded-lg w-5 h-5 group-hover:flex justify-center items-center hover:bg-pink-100">{"+"}</button>
				</div>

			</div>
		</div>
	);
}

export default TCGCard;
