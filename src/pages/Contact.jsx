import React from 'react';
import Title from "../components/Title.jsx";
import {assets} from "../assets/assets.js";
import NewsletterBox from "../components/NewsletterBox.jsx";

const Contact = () => {
    return (
        <div>
            <div className='text-center text-3xl pt-10 border-t'>
                <Title text1={'Шукайте'} text2={'нас'}/>
            </div>
            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
                <img className='w-full md:max-w-[550px]' src={assets.shop_inside} alt=''/>
                <div className='flex flex-col justify-center items start gap-6'>
                    <p className='font-semibold text-xl text-gray-600 dark:text-white'>Наші магазини</p>
                    <p className='text-gray-500 dark:text-white'><a
                        href="https://maps.app.goo.gl/7ZSHg4tzQWAuRKSq9" target="_blank">Київ: вул.
                        Оноре де Бальзака, 100</a></p>
                    <p className='text-gray-500 dark:text-white'><a
                        href="https://www.google.com/maps/place/Шевченка,+10,+Львів" target="_blank">Львів: вул.
                        Шевченка, 10</a></p>
                    <p className='text-gray-500 dark:text-white'><a
                        href="https://www.google.com/maps/place/Дерибасівська,+15,+Одеса" target="_blank">Одеса: вул.
                        Дерибасівська, 15</a></p>
                    <p className='text-gray-500 dark:text-white'>
                        Телефон підтримки:&nbsp;
                        <a href="tel:+380507777777" className='text-gray-500 dark:text-white'>
                            050 777 77 77
                        </a>
                    </p>
                    <p className='text-gray-500 dark:text-white'>
                        Пошта:&nbsp;
                        <a href="mailto:trendify.support@gmail.com" className='text-gray-500 dark:text-white'>
                            trendify.support@gmail.com
                        </a>
                    </p>
                    <p className='font-semibold text-xl text-gray-600 dark:text-white'>Соціальні мережі</p>
                    <div className="flex space-x-4">
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
                           aria-label="Instagram">
                            <img src={assets.instagram} alt="Instagram" className="w-6 h-6 dark:invert dark:bg-white"/>
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                           aria-label="Facebook">
                            <img src={assets.facebook} alt="Facebook" className="w-6 h-6 dark:invert dark:bg-white"/>
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"
                           aria-label="X (Twitter)">
                            <img src={assets.twitter} alt="X (Twitter)" className="w-6 h-6 dark:invert dark:bg-white"/>
                        </a>
                    </div>
                    <p className='font-semibold text-xl text-gray-600 dark:text-white'>Кар'єра в Trendify</p>
                    <p className='text-gray-500 dark:text-white'>Дізнайся більше про можливості роботи з нами</p>
                    <button
                        className='border border-black px-8 py-4 text-xl bg-black text-white dark:text-black dark:bg-white rounded'>Переглянути
                        Вакансії
                    </button>
                </div>
            </div>
            <NewsletterBox/>
        </div>

    );
};

export default Contact;