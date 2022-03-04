import Link from "next/link";


interface Props {
	content: string
	link: string
}


export default function Button(props: Props) {
	return (
		<button className='h-10 bg-purple-700 rounded-xl m-2 p-2 hover:scale-125 ease-in-out duration-300'>
			<Link href={ props.link }>
				<a className='font-semibold text-white'>{ props.content }</a>
			</Link>
		</button>
	)
}