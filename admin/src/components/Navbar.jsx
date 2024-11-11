import React from 'react'
import { assets } from '../assets/assets'
import ThemeToggle from "./ThemeToggle.jsx";

const Navbar = ({ setToken }) => {
    return (
        <div className='flex items-center py-2 px-[4%] justify-between'>
            <img className='w-[max(10%,80px)] dark:invert dark:bg-white' src={assets.trendify} alt="" />
            <ThemeToggle/>
            <button onClick={() => setToken('')} className='bg-black text-white px-5 py-2 sm:px-7 sm:py-2 rounded text-xs sm:text-sm dark:bg-white dark:text-black'>Вийти</button>
        </div>
    )
}

export default Navbar