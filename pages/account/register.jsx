import Link from "next/link";

export default function Register() {
	const registerUser = async event => {
		if (event.target.password.value === event.target.confirmPassword.value) {
			
			await fetch('/api/register', {
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
			<h1>Register</h1>
			<Link href="/account/login">Already have an account?</Link>
			<form onSubmit={registerUser}>
				<div>
					<label>Pseudo</label>
					<input name="name" type="text" required/>
				</div>
				<div>
					<label>Email</label>
					<input name="email" type="text" required/>
				</div>
				<div>
					<label>Password</label>
					<input name="password" type="text" required/>
				</div>
				<div>
					<label>Confirm Password</label>
					<input name="confirmPassword" type="text" required/>
				</div>
				<button>Register</button>
			</form>
		</>
	)
}