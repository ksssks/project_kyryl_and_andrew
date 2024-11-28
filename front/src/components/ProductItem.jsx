import React, { useContext } from 'react';
import { ShopContext } from "../context/ShopContext.jsx";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, salePrice }) => {
    const { currency } = useContext(ShopContext);

    // Проверяем наличие скидки
    const hasDiscount = salePrice && salePrice < price;

    return (
        <Link className="text-gray-700 cursor-pointer dark:text-white" to={`/product/${id}`}>
            <div className="overflow-hidden">
                <img
                    className="hover:scale-110 transition ease-in-out"
                    src={image[0]}
                    alt="First image of a product"
                />
            </div>
            <p className="pt-3 pb-1 text-sm">{name}</p>
            <div className="text-sm font-medium">
                {hasDiscount ? (
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700 line-through dark:text-white">{price}{currency}</span>
                        <span className="text-red-500">{salePrice}{currency}</span>
                    </div>
                ) : (
                    <span>{price}{currency}</span>
                )}
            </div>
        </Link>
    );
};

export default ProductItem;