import React from 'react';
import {assets} from "../assets/assets.js";

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img src={assets.trendify} className='mb-5 w-16 h-16' alt='Logo'/>
                    <p className='w-full md:w-2/3 text-gray-600'>Наш інтернет-магазин преміум одягу пропонує вишуканий
                        асортимент для тих, хто цінує стиль, якість та індивідуальність. Ми представляємо чудові
                        колекції
                        від провідних світових брендів, які поєднують модні тренди та класичну елегантність. Кожен виріб
                        створений з увагою до деталей і виготовлений з найкращих матеріалів.</p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>Компанія</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Домашня</li>
                        <li>Про нас</li>
                        <li>Доставка</li>
                        <li>Політика конфіденційності</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>Зв'яжіться з нами</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>050 777 77 77</li>
                        <li>trendify.support@gmail.com</li>
                    </ul>
                    <div className='flex gap-3 mt-5'>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
                           aria-label="Instagram">
                            <img src={assets.instagram}  alt="Instagram" className="w-6 h-6"/>
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                           aria-label="Facebook">
                            <img src={assets.facebook} alt="Facebook" className="w-6 h-6"/>
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"
                           aria-label="X (Twitter)">
                            <img src={assets.twitter} alt="X (Twitter)" className="w-6 h-6"/>
                        </a>
                    </div>
                </div>

            </div>
            <div>
                <hr/>
                <p className='py-5 text-sm text-center'>© 2024 Trendify. Всі права захищені.</p>
            </div>
        </div>
    );
};

export default Footer;