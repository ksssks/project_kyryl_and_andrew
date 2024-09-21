import React, {useContext, useEffect, useState} from 'react';
import {ShopContext} from "../context/ShopContext.jsx";
import {assets} from "../assets/assets.js";
import Title from "../components/Title.jsx";
import ProductItem from "../components/ProductItem.jsx";

const Collection = () => {

    const {products} = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(true);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    const toggleCategory = (e) => {

        if (category.includes(e.target.value)) {
            setCategory(prev=>prev.filter(item => item !== e.target.value))
        }
        else {
            setCategory(prev =>[...prev,e.target.value])
        }
    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)){
            setSubCategory(prev=>prev.filter(item => item !== e.target.value))
        }
        else{
            setSubCategory(prev=>[...prev,e.target.value])
        }
    }

    const applyFilter = () =>{
        let productsCopy = products.slice();

        if (category.length > 0){
            productsCopy = productsCopy.filter(item => category.includes(item.category))
        }
        setFilterProducts(productsCopy)
    }

    useEffect(()=>{
      setFilterProducts(products);
    },[])

    useEffect(()=>{
        applyFilter();
    },[category, subCategory])
    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            {/*Filters*/}
            <div className='min-w-60'>
                <p onClick={() => setShowFilter(!showFilter)}
                   className='my-2 text-xl flex items-center cursor-pointer gap-2'>Фільтри
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown} alt=''/>
                </p>
                {/*Category*/}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>Категорії</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700 '>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory}/> Чоловічий одяг
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory}/> Жіночий одяг
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory}/> Дитячий одяг
                        </p>
                    </div>
                </div>
                {/*Subcategory filter*/}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>Тип товару</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700 '>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/> Верхній одяг
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/> Нижній одяг
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/> Зимовий одяг
                        </p>
                    </div>
                </div>
            </div>
            {/*Right side*/}
            <div className='flex-1'>

                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'Усі'} text2={'колекції'}/>
                    {/*Product Sort*/}
                    <select className='border-2 border-gray-300 text-sm px-2'>
                        <option value='relevant'>Сортувати за релевантністю</option>
                        <option value='low-high'>Ціна (за зростанням)</option>
                        <option value='high-low'>Ціна (за спаданням)</option>
                    </select>
                </div>
                {/*Map products*/}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {
                       filterProducts.map((item,index)=>(
                           <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
                       ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Collection;