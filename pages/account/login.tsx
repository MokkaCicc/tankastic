import NavBar from "../../components/navbar"
import Link from "../../components/link"
import Input from "../../components/input"
import Button from "../../components/button"
import Title from "../../components/title"

export default function Register() {
	return (
		<>
			<NavBar />
			<Title content='Login' />
			<form onSubmit=''>
				<Input label='Email' name='email' type='text' />
				<Input label='Password' name='password' type='text' />
				<Button content='Login' link='' />
				<Link link='/account/register' content='Need to create an account?' />
			</form>
		</>
	)
}