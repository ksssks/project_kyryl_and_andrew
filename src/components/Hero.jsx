import React from 'react';
import {assets} from "../assets/assets.js";

const Hero = () => {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400'>
            {/* Hero Left Side*/}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-[#414141]'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-24 h-[2px] bg-[#414141]'></p>
                        <p className='font-medium text-sm md:text-base'>Наші бестселлери</p>
                    </div>
                    <h1 className='text-2xl sm:py-3 lg:text-5xl leading-relaxed'>Нові надходження</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-medium text-sm md:text-base'>Насолоджуйтесь</p>
                        <p className='w-8 md:w-24 h-[2px] bg-[#414141]'></p>
                    </div>
                </div>
            </div>
            {/* Hero Right Side*/}
            <img className='w-full sm:w-1/2' src={assets.hero} alt='Hero image'/>
        </div>
    );
};

export default Hero;