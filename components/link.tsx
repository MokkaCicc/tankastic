import NextLink from "next/link"


interface Props {
	content: string
	link: string
}


export default function Link(props: Props) {
	return (
		<NextLink href={ props.link }>
			<a className='font-semibold text-purple-700 m-2 underline'>{ props.content }</a>
		</NextLink>
	)
}