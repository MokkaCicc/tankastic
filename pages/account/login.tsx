import bcrypt from 'bcryptjs'
import NavBar from '../../components/navbar'
import Link from '../../components/link'
import Input from '../../components/input'
import Title from '../../components/title'
import { FormEvent } from 'react'


export default function Register() {
	const loginUser = async (event: FormEvent) => {
		event.preventDefault()

		await fetch('/api/user/auth', {
			body: JSON.stringify({
				email: event.target.email.value,
				password: event.target.password.value
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		})
	}

	return (
		<>
			<NavBar />
			<Title content='Login' />
			<form onSubmit={ loginUser }>
				<Input label='Email' name='email' type='text' />
				<Input label='Password' name='password' type='password' />
				<button className='h-10 bg-purple-700 rounded-xl m-2 p-2 font-semibold text-white' type='submit'>Login</button>
				<Link link='/account/register' content='Need to create an account?' />
			</form>
		</>
	)
}