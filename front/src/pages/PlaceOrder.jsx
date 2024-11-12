import React, { useContext, useState } from 'react';
import Title from "../components/Title.jsx";
import CartTotal from "../components/CartTotal.jsx";
import { assets } from "../assets/assets.js";
import { ShopContext } from "../context/ShopContext.jsx";
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        setFormData(data => ({ ...data, [name]: value }))

    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            switch (method) {

                case 'cod':

                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
                    
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                case 'stripe':

                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })

                    if (responseStripe.data.success) {
                        const {session_url} = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }
                    break;

                default:
                    break;
            }

        } catch (error) {
            console.log(error);
            toast.error
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] boder-top'>
            {/*Left side*/}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-sl sm:text-2xl my-3'>
                    <Title text1={'Подробиці'} text2={'доставки'} />
                </div>
                <div className='flex gap-3 '>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border-gray-300 rounded py-1.5 px-3.5 w-full border-2' type='text'
                        placeholder='Ім`я' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border-gray-300 rounded py-1.5 px-3.5 w-full border-2' type='text'
                        placeholder='Прізвище' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border-gray-300 rounded py-1.5 px-3.5 w-full border-2' type='email'
                    placeholder='Email' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border-gray-300 rounded py-1.5 px-3.5 w-full border-2' type='text'
                    placeholder='Вулиця' />
                <div className='flex gap-3 '>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border-gray-300 rounded py-1.5 px-3.5 w-full border-2' type='text'
                        placeholder='Місто' />
                    <input onChange={onChangeHandler} name='state' value={formData.state} className='border-gray-300 rounded py-1.5 px-3.5 w-full border-2' type='text'
                        placeholder='Область' />
                </div>
                <div className='flex gap-3 '>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border-gray-300 rounded py-1.5 px-3.5 w-full border-2' type='number'
                        placeholder='Почтовий індекс' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='border-gray-300 rounded py-1.5 px-3.5 w-full border-2' type='text'
                        placeholder='Країна' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border-gray-300 rounded py-1.5 px-3.5 w-full border-2' type='number'
                    placeholder='Номер телефону' />
            </div>
            {/*Right side*/}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>
                <div className='mt-12'>
                    {/*Payment methods*/}
                    <Title text1={'Спосіб'} text2={'оплати'}></Title>
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 rounded cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-700' : ''}`}></p>
                            <img className='h-5 mx-4 dark:invert dark:bg-white' src={assets.stripe}
                                alt='Payment method' />
                        </div>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 rounded cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-700' : ''}`}></p>
                            <p className='text-black text-sm font-medium mx-4 dark:text-white'>Оплата при отриманні</p>
                        </div>
                    </div>
                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-black text-white px-16 py-3 text-sm rounded dark:bg-white dark:text-black'>
                            Оформити замовлення
                        </button>
                    </div>
                </div>
            </div>
        </form>

    );
};

export default PlaceOrder;