import React, { useEffect } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link,useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux';

const Header = () => {
    const {currentUser} = useSelector((state) => state.user);
    const [searchTerm,setSearchTerm] = React.useState('');
    const Navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        Navigate(`/search?${searchQuery}`);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTerm = urlParams.get('searchTerm');
        if (searchTerm) {
          setSearchTerm(searchTerm);
        }
      }, [location.search]);    

  return (
    <header>
        <div className='flex justify-between items-center mx-auto p-3 bg-slate-100'>
            <h1 className='font-bold text-sm sm:text-xl flex-wrap space-x-1'>
                <span className='text-slate-500'>♾️</span>
                <span className='text-slate-400'>Villas</span>
            </h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Search for locations..' className='focus:outline-none border border-slate-300 rounded-md px-2 py-1 text-sm sm:text-base w-24 sm:w-64  p-3' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
                <button>
                    <FaSearch className='inline-block ml-2 text-slate-500 cursor-pointer'/>
                </button>
            </form> 
            <ul className='flex gap-4'>
                <li className='hidden sm:inline text-slate-700'><Link to="/">Home</Link></li>
                <li className='hidden sm:inline text-slate-700'><Link to="/about">About</Link></li>
                <li className='text-slate-700'>{currentUser ? (
                    <Link to="/profile">
                    <img src={currentUser.avatar} alt="profile" className="h-8 w-8 rounded-full object-cover" />
                    </Link>) : (<Link to="/sign-in">Sign in</Link>)}
                </li>     
            </ul>
        </div>
        
    </header>
  ) 
}

export default Header 