import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
        <div className='flex justify-between items-center mx-auto p-3 bg-slate-100'>
            <h1 className='font-bold text-sm sm:text-xl flex-wrap'>
                <span className='text-slate-500'>Infinity</span>
                <span className='text-slate-400'>Villas</span>
            </h1>
            <form>
                <input type="text" placeholder='Search for locations..' className='focus:outline-none border border-slate-300 rounded-md px-2 py-1 text-sm sm:text-base w-24 sm:w-64  p-3'/>
                <FaSearch className='inline-block ml-2 text-slate-500 cursor-pointer'/>
            </form> 
            <ul className='flex gap-4'>
                <li className='hidden sm:inline text-slate-700'><Link to="/">Home</Link></li>
                <li className='hidden sm:inline text-slate-700'><Link to="/about">About</Link></li>
                <li className=' text-slate-700'><Link to="/sign-in">Sign In</Link></li>     
            </ul>
        </div>
        
    </header>
  )
}

export default Header 