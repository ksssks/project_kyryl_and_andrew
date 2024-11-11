import React from 'react';
import Title from "../components/Title.jsx";
import {assets} from "../assets/assets.js";
import NewsletterBox from "../components/NewsletterBox.jsx";

const About = () => {
    return (
        <div>
            <div className='text-3xl pt-8 border-t'><Title text1={'Про'} text2={'нас'}/></div>
            <div className='my-10 flex flex-col gap-16'>
                <img className='w-full h-[300px] md:h-[500px] object-cover' src={assets.shop} alt='About image'/>
                <div className='flex flex-col justify-center gap-6 text-gray-600 dark:text-white'>
                    <p>Ласкаво просимо до Trendify — інтернет-магазину дизайнерського одягу, заснованого в 2005 році. Ми
                        поєднуємо стиль, якість і інновації, пропонуючи вам ексклюзивні колекції від найкращих сучасних
                        дизайнерів. Наші фізичні магазини розташовані в Києві, Львові та Харкові, де ви можете побачити
                        та приміряти найновіші тренди від брендів, таких як UrbanCode, ElitéMode та NeoVogue.</p>
                    <b className='text-gray-800 dark:text-white'>Наша мета</b>
                    <p>Допомогти вам знайти свій унікальний стиль, пропонуючи лише найякісніші та
                        найсучасніші речі. Завітайте до Trendify, щоб отримати натхнення і відчути новий рівень
                        моди!</p>
                </div>
            </div>
            <div className='pt-2'>
                <div className='text-3xl '>
                    <Title text1='Чому' text2='ми?'/>
                </div>
                <div className='my-10 flex flex-col md:flex-row gap-16'>
                    <img className='w-full md:max-w-[450px]' src={assets.shopping_woman} alt='About image'/>
                    <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 dark:text-white'>
                        <p>Trendify — це простір для тих, хто цінує унікальні деталі у своєму гардеробі. Ми
                            пропонуємо не просто одяг, а спосіб самовираження через сучасний дизайн і високоякісні
                            матеріали. Кожен наш виріб створений, щоб доповнити вашу особистість.</p>
                        <p>Від співпраці з локальними дизайнерами до впровадження екологічних матеріалів — ми
                            прагнемо зробити ваш досвід шопінгу не лише модним, але й свідомим. Підтримуючи
                            ініціативи сталого розвитку, ми постійно оновлюємо асортимент, щоб ви завжди мали доступ
                            до найкращого.</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row text-sm mb-20 dark:text-white'>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
                    <b>Якість</b>
                    <p className='text-gray-600 dark:text-white'>У Trendify ми гарантуємо 100% оригінальність кожного
                        товару. Наш асортимент складається виключно з продукції від перевірених брендів, що забезпечує
                        високу якість і довговічність одягу.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Підтримка ЗСУ</b>
                    <p className='text-gray-600 dark:text-white'>Ми щиро підтримуємо Збройні Сили України і частину
                        наших прибутків направляємо на благодійні проекти для допомоги військовим. Ваші покупки сприяють
                        важливим ініціативам, які роблять внесок у нашу перемогу.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Вибір</b>
                    <p className='text-gray-600 dark:text-white'>У нас ви знайдете різноманітні стилі одягу: від
                        класичних і елегантних до сучасних і спортивних. Trendify пропонує речі для будь-якої нагоди,
                        щоб ви могли виразити свій стиль у кожному аспекті життя.</p>
                </div>

            </div>
            <NewsletterBox/>
        </div>
    );
};

export default About;