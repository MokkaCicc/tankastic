import Link from "next/link";

export default function Register() {
	return (
		<>
			<h1>Register</h1>
			<Link href="/account/login">Already an account?</Link>
			<form onSubmit="">
				<div>
					<label>Pseudo</label>
					<input name="name" type="text"/>
				</div>
				<div>
					<label>Email</label>
					<input name="email" type="text"/>
				</div>
				<div>
					<label>Password</label>
					<input name="password" type="text"/>
				</div>
				<div>
					<label>Confirm Password</label>
					<input name="confirmPassword" type="text"/>
				</div>
				<button>Register</button>
			</form>
		</>
	)
}