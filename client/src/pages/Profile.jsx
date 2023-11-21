import {useSelector} from 'react-redux';

const Profile = () => {
    const {currentUser} = useSelector((state) => state.user);
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form className='flex flex-col gap-4'> 
                <img 
                    className='w-24 h-24 rounded-full object-cover 
                    self-center mt-7 cursor-pointer' 
                    src={currentUser.avatar} 
                    alt="profile" 
                />
                <input 
                    className='border rounded-lg p-3' 
                    type="text" 
                    placeholder='username' 
                    id="username" 
                />
                <input 
                    className='border rounded-lg p-3' 
                    type="email" 
                    placeholder='email' 
                    id="email" 
                />
                <input 
                    className='border rounded-lg p-3' 
                    type="password" 
                    placeholder='password' 
                    id="password" 
                />
                <button className='bg-slate-700 p-3
                 text-white uppercase rounded-lg 
                 hover:opacity-80 disabled:opacity-95'>Update</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className='text-red-700 cursor-pointer'>Delete Account</span>
                <span className='text-red-700 cursor-pointer'>Sign out</span>
            </div>
        </div>
    )
}

export default Profile;