import Button from './button'


export default function NavBar() {
	return (
		<nav className='bg-slate-800 flex h-14'>
			<Button content='Home' link='/' />
			<Button content='Register' link='/account/register' />
			<Button content='Login' link='/account/login' />
		</nav>
	)
}