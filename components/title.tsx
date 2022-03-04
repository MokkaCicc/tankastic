interface Props {
	content: string
}

export default function Title(props: Props) {
	return (
		<h1 className='m-3 text-4xl'>{ props.content }</h1>
	)
}