import React, {useContext, useEffect, useState} from 'react';
import {ShopContext} from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItem from "./ProductItem.jsx";

const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);
    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller))
        setBestSeller(bestProduct.slice(0, 5))
    }, [])
    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'Найчастіше'} text2={'купують'}/>
                <p className='w=3/4 ,m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    У цьому розділі ви знайдете найпопулярніші моделі одягу преміум-класу, які вже стали улюбленцями
                    наших
                    клієнтів. Це речі, що вирізняються своєю універсальністю, бездоганним стилем та високою якістю
                    виконання. В асортименті представлені моделі з натуральних матеріалів, які поєднують комфорт і
                    сучасний
                    дизайн. Тут ви знайдете найактуальніші речі, які ідеально доповнять ваш гардероб, незалежно від
                    випадку
                    чи настрою. Обирайте серед найулюбленіших позицій і додавайте до свого образу нотку елегантності та
                    розкоші.
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
                    ))}
            </div>
        </div>
    );
};

export default BestSeller;