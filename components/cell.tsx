import Tank from './tank'

interface Props {
	col: number,
	row: number,
	hasTank: boolean
}

export default function Cell(props: Props) {
	return (
		<>
			{props.hasTank
				? <div className='flex items-center justify-center h-12 w-12 border-2 border-slate-700 bg-red-500'>
						<Tank />
					</div>
				: <div className='flex items-center justify-center h-12 w-12 border-2 border-slate-700'>
						<p>{props.col};{props.row}</p>
					</div>
			}
		</>
		

		

		
	)
}