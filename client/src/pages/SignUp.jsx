import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

const SignUp = () => {
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({...formData, [e.target.id]: e.target.value});
	};
	console.log(formData);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			setError(false);
			const res = await fetch('/api/auth/sign-up', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formData),
		});	
		const data = await res.json();
		setLoading(false);
		if (data.success === false) {
			setError(true);
			return;
		}
		navigate('/sign-in');
		alert("User Registered Successfully!");
		console.log(data);
		} catch (err) {
			setLoading(false);
			setError(true);
		}		
	};

	return (
		<div className="px-4 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4" >
				<input 
					type="text" 
					placeholder="Username" 
					id="username" 
					className="border p-3 rounded-lg"
					onChange={handleChange}
				/>
				<input 
					type="text" 
					placeholder="Email" 
					id="email" 
					className="border p-3 rounded-lg"
					onChange={handleChange}
				/>
				<input 
					type="password" 
					placeholder="Password" 
					id="password" 
					className="border p-3 rounded-lg"
					onChange={handleChange}
				/>
				<button 
					disabled={loading} 
					className="bg-slate-700 text-white 
					uppercase p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
				>
					{loading ? "Loading..." : "Sign Up"}
				</button>
			</form>
			<div className="flex gap-2 mt-5">
				<p>Have an account?</p>
				<Link to='/sign-in' className="text-blue-700">Sign in</Link>
			</div>
			<div>
				<p className='text-red-700 mt-5'>{error && "Something went wrong!"}</p>
			</div>
		</div>
	) 
}

export default SignUp;