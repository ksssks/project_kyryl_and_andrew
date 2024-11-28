import React, {useContext, useEffect, useState} from 'react';
import {ShopContext} from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItem from "./ProductItem.jsx";

const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,15));
    }, [products])
    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'Остання'} text2={'колекція'}/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 dark:text-white'>
                    У нашому інтернет-магазині представлена нова колекція одягу преміум-класу. Колекція поєднує
                    легкість, стиль і комфорт, створюючи ідеальний вибір для теплих днів. Тут ви знайдете ексклюзивні
                    моделі з натуральних матеріалів, таких як бавовна та шовк, що забезпечують комфорт і свободу рухів.
                    Легкі сукні, сорочки, шорти та аксесуари з яскравими принтами й сучасними силуетами створені для
                    тих, хто хоче виглядати бездоганно. Замовляйте просто зараз і сбирай свій бездоганний лук.
                </p>
            </div>

            {/* Rendering products*/}

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    latestProducts.map((item,index)=>(
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} salePrice={item.salePrice} price={item.price}/>
                    ))
                }
            </div>

        </div>
    );
};

export default LatestCollection;