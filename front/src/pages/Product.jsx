import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ShopContext} from "../context/ShopContext.jsx";
import RelatedProducts from "../components/RelatedProducts.jsx";
import SizeChart from "../components/SizeChart.jsx";

const Product = () => {
    const {productId} = useParams();
    const {products, currency, addToCart} = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id === productId) {
                setProductData(item);
                setImage(item.image[0]);
                return null;
            }
        });
    };

    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            {/* Product Data */}
            <div className='flex-gap-12 sm:gap-12 flex-col sm:flex-row'>
                {/* Product Images */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[10%] w-full'>
                        {productData.image.map((item, index) => (
                            <img onClick={() => setImage(item)} src={item} key={index}
                                 className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt=''/>
                        ))}
                    </div>
                    <div className='w-full sm:w-[50%]'>
                        <img className='w-full h-auto' src={image} alt=''/>
                    </div>
                    {/* Product Information */}
                    <div className='flex-1'>
                        <h1 className='font-medium text-2xl mt-2 dark:text-white'>{productData.name}</h1>
                        {/* Отображение цены */}
                        <div className='mt-5'>
                            {productData.salePrice && productData.salePrice < productData.price ? (
                                <div>
                                    <span className='text-gray-700 line-through text-3xl mr-2 dark:text-white'>
                                        {productData.price}{currency}
                                    </span>
                                    <span className='text-red-500 text-3xl font-medium'>
                                        {productData.salePrice}{currency}
                                    </span>
                                </div>
                            ) : (
                                <span className='text-3xl font-medium dark:text-white'>
                                    {productData.price}{currency}
                                </span>
                            )}
                        </div>
                        <p className='mt-5 text-gray-500 md:w-4.5 dark:text-white'>{productData.description}</p>
                        <div className='flex flex-col gap-4 my-8'>
                            <p className='dark:text-white'>Оберіть розмір</p>
                            <div className='flex gap-2'>
                                {productData.sizes.map((item, index) => (
                                    <button onClick={() => setSize(item)}
                                            className={`border py-2 px-4 bg-gray-100 rounded ${item === size ? '!bg-black !text-white' : ''}`}
                                            key={index}>{item}</button>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => addToCart(productData._id, size)}
                                className='bg-black text-white px-10 py-3 text-sm active:bg-gray-700 dark:text-black dark:bg-white rounded'>
                            Додати у корзину
                        </button>
                        <p className='text-sm mt-5 dark:text-white'>Артикул: {productData._id}</p>
                        <hr className='mt-8 sm:w-4/5'/>
                        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1 dark:text-white'>
                            <p>Товар є оригінальним з сертифікатом якості.</p>
                            <p>Є можливість оплати при отриманні.</p>
                            <p>Легка політика повернення та обміну протягом 14 днів.</p>
                        </div>
                    </div>
                </div>
                <div className='mt-20'>
                    <div className='flex dark:text-white'>
                        <b className='border px-5 py-3 text-sm'>Опис</b>
                        <b className='border px-5 py-3 text-sm'>Відгуки(122)</b>
                    </div>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 dark:text-white'>
                    <SizeChart/>
                    <p>Якщо у вас виникли додаткові питання щодо продукту, ви завжди можете звернутися до нас для
                        отримання більш детальної інформації.</p>
                </div>
            </div>
            {/* Display related products */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
        </div>
    ) : (
        <div className='opacity-0'></div>
    );
};

export default Product;
