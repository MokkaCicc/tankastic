interface Props {
	label: string,
	name: string,
	type: string
}

export default function Input(props: Props) {
	return (
		<div className='flex flex-col m-4'>
			<label className='text-gray-600 text-lg'>{ props.label }</label>
			<input className='border-2 border-slate-700 w-80 h-8 rounded-lg p-1' name={ props.name } type={ props.type } required />
		</div>
	)
}