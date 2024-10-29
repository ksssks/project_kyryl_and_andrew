import React, {useContext, useState} from 'react';
import {assets} from "../assets/assets.js";
import {Link, NavLink} from "react-router-dom";
import {ShopContext} from "../context/ShopContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartCount} = useContext(ShopContext)

    return (
        <div className='flex items-center justify-between py-5 font-medium'>

            <Link to='/'><img src={assets.trendify} className='w-20 dark:invert dark:bg-white' alt="Logo"/></Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700 dark:bg-black'>
                <NavLink to='/' className='flex flex-col items-center gap-1 dark:text-white'>
                    <p>Домашня</p>
                    <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 dark:bg-white hidden'/>
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1 dark:text-white'>
                    <p>Колекція</p>
                    <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 dark:bg-white hidden'/>
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1 dark:text-white'>
                    <p>Про нас</p>
                    <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 dark:bg-white hidden'/>
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1 dark:text-white '>
                    <p>Контакти</p>
                    <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 dark:bg-white hidden'/>
                </NavLink>
            </ul>
            <div className='flex items-center gap-7'>

                <ThemeToggle />
                <img onClick={() => setShowSearch(true)} src={assets.search} className='w-7 cursor-pointer dark:invert dark:bg-white'
                     alt="Search"/>
                <div className='group relative'>
                    <Link to='/login'><img className='w-7 cursor-pointer dark:invert dark:bg-white' src={assets.profile} alt="Profile"/></Link>
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded  dark:bg-gray-700 dark:text-white'>
                            <p className='cursor-pointer hover:text-black dark:hover:text-gray-400'>Профіль</p>
                            <p className='cursor-pointer hover:text-black dark:hover:text-gray-400'>Замовлення</p>
                            <p className='cursor-pointer hover:text-black dark:hover:text-gray-400'>Вийти</p>
                        </div>
                    </div>
                </div>

                <Link to='/cart' className='relative'>
                    <img src={assets.cart} className='w-7 cursor-pointer dark:invert dark:bg-white' alt="Cart"/>
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] dark:text-black dark:bg-white'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu} className='w-7 cursor-pointer dark:invert dark:bg-white sm:hidden'
                     alt='Menu'/>
            </div>
            {/* sidebar menu for small screen */}
            <div
                className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white dark:bg-black transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600 dark:bg-black dark:text-white'>
                    <div onClick={() => setVisible(false)} className='flex item-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown} className='h-7 cursor-rotate-180 dark:invert dark:bg-white' alt="Dropdown"/>
                        <p>Повернутися</p>
                    </div>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>Домашня</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>Коллекції</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>Про нас</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>Контакти</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;