import React, {useContext, useEffect, useState} from 'react';
import {ShopContext} from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItem from "./ProductItem.jsx";

// eslint-disable-next-line react/prop-types
const RelatedProducts = ({category, subCategory}) => {

    const {products} = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

            const shuffleArray = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            };

            const shuffledProducts = shuffleArray(productsCopy);
            setRelated(shuffledProducts.slice(0, 5));
        }

    }, [products, category, subCategory]);

    return (
        <div>
            <div className='my-24'>
                <div className='text-center text-3xl py-2'>
                    <Title text1={'Схожі'} text2={'товари'}/>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {related.map((item, index) => (
                        <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RelatedProducts;