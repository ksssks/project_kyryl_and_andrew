import React, {useContext} from 'react';
import {ShopContext} from "../context/ShopContext.jsx";
import Title from "../components/Title.jsx";

const Orders = () => {

    const {products, currency} = useContext(ShopContext);
    return (
        <div className='border-t pt-16'>
            <div className='text-2xl'>
                <Title text1={'Мої'} text2={'замовлення'}/>
            </div>

            <div>{
                products.slice(1, 4).map((item, index) => (
                    <div key={index}
                         className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 dark:text-white'>
                        <div className='flex items-start gap-6 text-sm'>
                            <img className='w-16 sm:w-20' src={item.image[0]} alt='Product image'/>
                            <div>
                                <p className='sm:text-base font-medium'>{item.name}</p>
                                <div className='flex items-center gap-3 mt-2 text-base text-gray-700 dark:text-white'>
                                    <p className='text-lg'>Ціна: {item.price}{currency}</p>
                                    <p>Кількість: 1</p>
                                    <p>Розмір: L</p>
                                </div>
                                <p className='mt-2'>Дата: <span className='text-gray-400 dark:text-white'>14.10.2024</span></p>
                            </div>
                        </div>
                        <div className='md:w-1/2 flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                <p className='text-sm md:text-base'>Готово до відправки</p>
                            </div>
                        </div>
                        <div><button className='border rounded px-4 py-2 text-sm font-medium'>
                            Відслідкувати посилку
                        </button></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;