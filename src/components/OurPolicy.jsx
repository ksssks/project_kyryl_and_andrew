import React from 'react';
import {assets} from "../assets/assets.js";

const OurPolicy = () => {
    return (
        <div
            className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
            <div>
                <img src={assets.coin} className='w-12 m-auto mb-5 dark:invert dark:bg-white' alt=''/>
                <p className='font-semibold dark:text-white'>Легка політика обміну</p>
                <p className='text-gray-400 dark:text-white'>Безкоштовний обмін без будь-яких проблем</p>
            </div>
            <div>
                <img src={assets.trophy} className='w-12 m-auto mb-5 dark:invert dark:bg-white' alt=''/>
                <p className='font-semibold dark:text-white'>Повернення</p>
                <p className='text-gray-400 dark:text-white'>Пропонуємо 14 днів на повернення товару</p>
            </div>
            <div>
                <img src={assets.question} className='w-12 m-auto mb-5 dark:invert dark:bg-white' alt=''/>
                <p className='font-semibold dark:text-white'>Підтримка клієнтів</p>
                <p className='text-gray-400 dark:text-white'>24/7 відповідаєм на усі Ваші питання</p>
            </div>
        </div>
    );
};

export default OurPolicy;