import React, {useContext, useState} from 'react';
import {assets} from "../assets/assets.js";
import {Link, NavLink} from "react-router-dom";
import {ShopContext} from "../context/ShopContext.jsx";

const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartCount} = useContext(ShopContext)

    return (
        <div className='flex items-center justify-between py-5 font-medium'>

            <Link to='/'><img src={assets.trendify} className='w-20' alt="Logo"/></Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>Домашня</p>
                    <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>Колекція</p>
                    <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>Про нас</p>
                    <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1 '>
                    <p>Контакти</p>
                    <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>
            </ul>
            <div className='flex items-center gap-7'>
                <img onClick={()=>setShowSearch(true)} src={assets.search} className='w-7 cursor-pointer' alt="Search"/>

                <div className='group relative'>
                    <img className='w-7 cursor-pointer' src={assets.profile} alt="Profile"/>
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                            <p className='cursor-pointer hover:text-black'>Профіль</p>
                            <p className='cursor-pointer hover:text-black'>Замовлення</p>
                            <p className='cursor-pointer hover:text-black'>Вийти</p>
                        </div>
                    </div>
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart} className='w-7 cursor-pointer' alt="Cart"/>
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu} className='w-7 cursor-pointer sm:hidden'
                     alt='Menu'/>
            </div>
            {/* sidebar menu for small screen */}
            <div
                className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex item-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown} className='h-7 cursor-rotate-180' alt="Dropdown"/>
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