import React, {useState} from 'react';
import Title from "../components/Title.jsx";
import CartTotal from "../components/CartTotal.jsx";
import {assets} from "../assets/assets.js";

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] boder-top'>
            {/*Left side*/}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-sl sm:text-2xl my-3'>
                    <Title text1={'Подробиці'} text2={'доставки'}/>
                </div>
                <div className='flex gap-3 '>
                    <input className='border-gray-300 rounded py-1.5 px-3.5 w-full border-2' type='text'
                           placeholder='Ім`я'/>
                    <input className='border-gray-300 rounded py-1.5 px-3.5 w-full border-2' type='text'
                           placeholder='Прізвище'/>
                </div>
                <input className='border-gray-300 rounded py-1.5 px-3.5 w-full border-2' type='email'
                       placeholder='Email'/>
                <input className='border-gray-300 rounded py-1.5 px-3.5 w-full border-2' type='text'
                       placeholder='Вулиця'/>
                <div className='flex gap-3 '>
                    <input className='border-gray-300 rounded py-1.5 px-3.5 w-full border-2' type='text'
                           placeholder='Місто'/>
                    <input className='border-gray-300 rounded py-1.5 px-3.5 w-full border-2' type='text'
                           placeholder='Область'/>
                </div>
                <div className='flex gap-3 '>
                    <input className='border-gray-300 rounded py-1.5 px-3.5 w-full border-2' type='number'
                           placeholder='Почтовий індекс'/>
                    <input className='border-gray-300 rounded py-1.5 px-3.5 w-full border-2' type='text'
                           placeholder='Країна'/>
                </div>
                <input className='border-gray-300 rounded py-1.5 px-3.5 w-full border-2' type='number'
                       placeholder='Номер телефону'/>
            </div>
            {/*Right side*/}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal/>
                </div>
                <div className='mt-12'>
                    {/*Payment methods*/}
                    <Title text1={'Спосіб'} text2={'оплати'}></Title>
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 rounded cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-700': ''}`}></p>
                            <img className='h-5 mx-4 dark:invert dark:bg-white' src={assets.stripe}
                                 alt='Payment method'/>
                        </div>
                        <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 rounded cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-700': ''} `}></p>
                            <img className='h-5 mx-4 dark:invert dark:bg-white' src={assets.razorpay}
                                 alt='Payment method'/>
                        </div>
                        <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 rounded cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-700': ''}`}></p>
                            <p className='text-black text-sm font-medium mx-4 dark:text-white'>Оплата при отриманні</p>
                        </div>
                    </div>
                    <div className='w-full text-end mt-8'>
                        <button className='bg-black text-white px-16 py-3 text-sm rounded dark:bg-white dark:text-black'>
                            Оформити замовлення
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PlaceOrder;