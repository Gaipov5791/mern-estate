import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-slate-200 shadow-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to='/' className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-slate-500">Bakyt</span>
                    <span className="text-slate-700">Estate</span>
                </Link>
                <form className="bg-slate-100 p-3 rounded-lg flex items-center w-24 sm:w-64">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="bg-transparent focus:outline-none"
                    />
                    <FaSearch className='text-slate-600'/>
                </form>
                <ul className='flex gap-4'>
                    <Link to='/' className='text-slate-700 hidden 
                    sm:inline hover:underline cursor-pointer'>Home</Link>
                    <Link to='/about' className='text-slate-700 hidden 
                    sm:inline hover:underline cursor-pointer'>About</Link>
                    <Link to='/sign-in' className='text-slate-700 
                    hover:underline cursor-pointer'>Sign in</Link>
                </ul>
            </div>
        </header>
    )
}

export default Header;