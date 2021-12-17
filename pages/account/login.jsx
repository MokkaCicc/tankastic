import Link from "next/link";

export default function Register() {
	return (
		<>
			<h1>Login</h1>
			<Link href="/account/register">Need to create an account?</Link>
			<form onSubmit="">
				<div>
					<label>Email</label>
					<input name="email" type="text"/>
				</div>
				<div>
					<label>Password</label>
					<input name="password" type="text"/>
				</div>
				<button>Login</button>
			</form>
		</>
	)
}