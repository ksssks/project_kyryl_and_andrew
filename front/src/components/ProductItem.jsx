import React, {useContext} from 'react';
import {ShopContext} from "../context/ShopContext.jsx";
import {Link} from "react-router-dom";

const ProductItem = ({id, image, name, price}) => {

    const {currency} = useContext(ShopContext);

    return (
        <Link className='text-gray-700 cursor-pointer dark:text-white' to={`/product/${id}`}>
            <div className='overflow-hidden'>
                <img className='hover:scale-110 transition easy-in-out' src={image[0]} alt="First image of a product"/>
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p  className='text-sm font-medium'>{price}{currency}</p>
        </Link>
    );
};

export default ProductItem;