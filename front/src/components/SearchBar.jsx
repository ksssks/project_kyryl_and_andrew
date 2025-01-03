import React, {useContext, useEffect, useState} from 'react';
import {ShopContext} from "../context/ShopContext.jsx";
import {assets} from "../assets/assets.js";
import {useLocation} from "react-router-dom";

const SearchBar = () => {

    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext)
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false)
        }
    }, [location])

    return showSearch && visible ? (
        <div className='border-t border-b bg-gray-50 text-center dark:bg-black'>
            <div
                className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 dark:bg-white'>
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                       className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Знайти потрібне'/>
                <img className='w-4' src={assets.search} alt='Search'/>
            </div>
            <img onClick={() => setShowSearch(false)} className='inline w-5 cursor-pointer dark:invert' src={assets.cross}
                 alt='Cross'/>
        </div>
    ) : null
};

export default SearchBar;
