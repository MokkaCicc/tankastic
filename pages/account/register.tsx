import NavBar from "../../components/navbar"
import Link from "../../components/link"
import Input from "../../components/input"
import Button from "../../components/button"
import Title from "../../components/title"


export default function Register() {
	const registerUser = async event => {
		if (event.target.password.value === event.target.confirmPassword.value) {
			await fetch('/api/user/new', {
				body: JSON.stringify({
					name: event.target.name.value,
					email: event.target.email.value,
					password: event.target.password.value
					
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})
		} else {
			event.preventDefault()
		}
	}

	return (
		<>
			<NavBar />
			<Title content='Register' />
			<form onSubmit={ registerUser }>
				<Input label='Pseudo' name='name' type='text' />
				<Input label='Email' name='email' type='text' />
				<Input label='Password' name='password' type='text' />
				<Input label='Confirm Password' name='confirmPassword' type='text' />
				<Button content='Register' link='' />
				<Link link='/account/login' content='Already have an account?' />
			</form>
		</>
	)
}