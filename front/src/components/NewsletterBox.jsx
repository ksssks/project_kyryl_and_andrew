import React from 'react';

const NewsletterBox = () => {

    const onSubmitHandler =(event) => {
        event.preventDefault();
    }

    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800 dark:text-white'>Підписуйтесь зараз & отримуйте безкоштовну доставку</p>
            <p className='mt-3 text-gray-400 dark:text-white'>Безкоштовна доставка при першій покупці за підписку на оновлення нашого
                магазину. Насолоджуйтесь шопінгом</p>
            <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input className='w-full sm:flex-1 outline-none dark:bg-black dark:text-white' type='email' placeholder='Введіть почту' required/>
                <button type='submit' className='bg-black text-white text-xs px-10 py-4 dark:bg-white dark:text-black'>Підписатись</button>
            </form>
        </div>
    );
};

export default NewsletterBox;