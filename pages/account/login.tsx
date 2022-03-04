import NavBar from '../../components/navbar'
import Link from '../../components/link'
import Input from '../../components/input'
import Title from '../../components/title'


export default function Register() {
	return (
		<>
			<NavBar />
			<Title content='Login' />
			<form onSubmit=''>
				<Input label='Email' name='email' type='text' />
				<Input label='Password' name='password' type='password' />
				<button className='h-10 bg-purple-700 rounded-xl m-2 p-2 font-semibold text-white' type='submit'>Login</button>
				<Link link='/account/register' content='Need to create an account?' />
			</form>
		</>
	)
}