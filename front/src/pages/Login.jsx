import React, { useContext, useEffect, useState } from 'react';
import { assets } from "../assets/assets.js";
import { ShopContext } from '../context/ShopContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const [currentState, setCurrentState] = useState('Увійти')
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {

            if (currentState === 'Зареєструватися') {

                const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                } else {
                    toast.error(response.data.message)
                }

            } else {

                const response = await axios.post(backendUrl + '/api/user/login', { email, password })
                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                } else {
                    toast.error(response.data.message)
                }

            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])

    return (
        <form onSubmit={onSubmitHandler}
            className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 dark:text-white'>
            <img src={assets.hello} className='w-28 dark:invert dark:bg-white' alt='Hello man' />
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='text-3xl'>{currentState}</p>
            </div>
            {currentState === 'Увійти' ? '' :
                <input onChange={(e) => setName(e.target.value)} value={name} type='text' className='w-full px-3 py-2 border border-gray-800 dark:border-white rounded dark:text-black'
                    placeholder='Ім`я' required />}
            <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' className='w-full px-3 py-2 border border-gray-800 dark:border-white rounded dark:text-black'
                placeholder='Почта' required />
            <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' className='w-full px-3 py-2 border border-gray-800 dark:border-white rounded dark:text-black'
                placeholder='Пароль' required />
            <div className='w-full flex justify-between text-sm mt-[-8px]'>
                <p className='cursor-pointer'>Забули пароль?</p>
                {
                    currentState === 'Увійти'
                        ? <p onClick={() => setCurrentState('Зареєструватися')} className='cursor-pointer'>Створити аккаунт</p>
                        : <p onClick={() => setCurrentState('Увійти')} className='cursor-pointer'>Увійти</p>
                }
            </div>
            <button className='bg-black text-white font-light px-12 py-2 mt-4 rounded dark:bg-white dark:text-black'>{currentState === 'Увійти' ? 'Увійти' : 'Зареєструватися'}</button>
        </form>
    );
};

export default Login;