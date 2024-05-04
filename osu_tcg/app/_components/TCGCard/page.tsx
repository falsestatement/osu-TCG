const TCGCard = () => {
	return (
		<div className="min-w-44 min-h-64 w-44 h-64 bg-gradient-to-br from-pink-400 to-violet-600 m-2 rounded-lg p-1 ">
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
