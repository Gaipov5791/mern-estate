import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import {useSelector, useDispatch} from 'react-redux';

const SignIn = () => {
	const [formData, setFormData] = useState({});
	// const [error, setError] = useState(null);
	// const [loading, setLoading] = useState(false);
	const {loading, error} = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({...formData, [e.target.id]: e.target.value});
	};
	console.log(formData);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(signInStart());
			const res = await fetch('/api/auth/sign-in', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formData),
		});	
		const data = await res.json();
		if (data.success === false) {
			dispatch(signInFailure(data.message));
			return;
		}
		dispatch(signInSuccess(data));
		navigate('/');
		console.log(data);
		} catch (error) {
			dispatch(signInFailure(error.message));
		}		
	};

	return (
		<div className="px-4 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4" >
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
					{loading ? "Loading..." : "Sign In"}
				</button>
			</form>
			<div className="flex gap-2 mt-5">
				<p>Dont have an account?</p>
				<Link to='/sign-up' className="text-blue-700">Sign up</Link>
			</div>
			<div>
				<p className='text-red-700 mt-5'>{error}</p>
			</div>
		</div>
	) 
}

export default SignIn;
