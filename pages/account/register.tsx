import bcrypt from 'bcryptjs'
import { FormEvent } from 'react'
import NavBar from '../../components/navbar'
import Link from '../../components/link'
import Input from '../../components/input'
import Title from '../../components/title'


export default function Register() {
	const registerUser = async (event: FormEvent) => {
		event.preventDefault()
		if (event.target.password.value !== event.target.confirmPassword.value) {
			return
		}

		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(event.target.password.value, salt)

		await fetch('/api/user/new', {
			body: JSON.stringify({
				name: event.target.name.value,
				email: event.target.email.value,
				password: hash
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
			<Title content='Register' />
			<form onSubmit={ registerUser }>
				<Input label='Pseudo' name='name' type='text' />
				<Input label='Email' name='email' type='text' />
				<Input label='Password' name='password' type='password' />
				<Input label='Confirm Password' name='confirmPassword' type='password' />
				<button className='h-10 bg-purple-700 rounded-xl m-2 p-2 font-semibold text-white' type='submit'>Register</button>
				<Link link='/account/login' content='Already have an account?' />
			</form>
		</>
	)
}