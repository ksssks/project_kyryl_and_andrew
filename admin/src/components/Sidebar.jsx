import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen border-r-2'>
            <div className='flex flex-col gap-4 pt-6 pl-[5%] text-[15px]'>

                <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/add">
                    <img className='w-5 h-5 dark:invert dark:bg-white' src={assets.add_icon} alt="" />
                    <p className='hidden md:block dark:text-white'>Додати товари</p>
                </NavLink>

                <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/list">
                    <img className='w-5 h-5 dark:invert dark:bg-white' src={assets.order_icon} alt="" />
                    <p className='hidden md:block dark:text-white'>Усі товари</p>
                </NavLink>

                <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/orders">
                    <img className='w-5 h-5 dark:invert dark:bg-white' src={assets.order_icon} alt="" />
                    <p className='hidden md:block dark:text-white'>Закази</p>
                </NavLink>

            </div>
        </div>
    )
}

export default Sidebar