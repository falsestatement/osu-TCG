const TCGCard = () => {
	return (
		<div className="[flex -ml-20 first:ml-0 min-w-44 min-h-64 w-44 h-64 bg-gradient-to-br from-pink-400 to-violet-600 rounded-lg p-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.35)] transition ease-in-out duration-200 hover:-translate-y-2 peer peer-hover:relative peer-hover:transition peer-hover:ease-in-out peer-hover:duration-200 peer-hover:translate-x-20">
			<div className="bg-pink-300 w-full h-full rounded-md p-2">
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
		</div>
	);
}

export default TCGCard;
