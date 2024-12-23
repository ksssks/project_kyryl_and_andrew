import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/assets.js";
import Title from "../components/Title.jsx";
import ProductItem from "../components/ProductItem.jsx";

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(true);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasDiscount, setHasDiscount] = useState(false); // Новий стан для фільтра знижок

    const productsPerPage = 24;

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    };

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setSubCategory(prev => [...prev, e.target.value]);
        }
    };

    const applyFilter = () => {
        let productsCopy = products.slice();

        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }

        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
        }

        if (showSearch && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        if (hasDiscount) {
            productsCopy = productsCopy.filter(item => item.salePrice && item.salePrice < item.price);
        }

        setFilterProducts(productsCopy);
        setCurrentPage(1);
    };

    const sortProduct = () => {
        let fpCopy = filterProducts.slice();

        switch (sortType) {
            case 'low-high':
                setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
                break;
            case 'high-low':
                setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
                break;
            default:
                applyFilter();
                break;
        }
    };

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch, hasDiscount, products]);

    useEffect(() => {
        sortProduct();
    }, [sortType]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filterProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filterProducts.length / productsPerPage);

    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
            <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`px-3 py-1 border ${i === currentPage ? 'bg-gray-300' : 'bg-white'}`}>
                {i}
            </button>
        );
    }

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            {/* Filters */}
            <div className='min-w-60'>
                <p onClick={() => setShowFilter(!showFilter)}
                   className='my-2 text-xl flex items-center cursor-pointer gap-2 dark:text-white'>Фільтри
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown} alt='' />
                </p>
                {/* Category Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium dark:text-white'>Категорії</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700 dark:text-white'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Чоловічий одяг'} onChange={toggleCategory} /> Чоловічий
                            одяг
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Жіночий одяг'} onChange={toggleCategory} /> Жіночий
                            одяг
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Дитячий одяг'} onChange={toggleCategory} /> Дитячий
                            одяг
                        </p>
                    </div>
                </div>
                {/* Subcategory Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium dark:text-white'>Тип товару</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700 dark:text-white'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Светри та худі'} onChange={toggleSubCategory} /> Светри та худі
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Футболки та реглани'} onChange={toggleSubCategory} /> Футболки та реглани
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Брюки та джинси'} onChange={toggleSubCategory} /> Брюки та джинси
                        </p>
                    </div>
                </div>
                {/* Discount Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium dark:text-white'>Знижка</p>
                    <div className='flex items-center gap-2 text-sm font-light text-gray-700 dark:text-white'>
                        <input className='w-3' type="checkbox" onChange={() => setHasDiscount(!hasDiscount)} />
                        <span>Товари зі знижкою</span>
                    </div>
                </div>
            </div>
            {/* Right side */}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'Усі'} text2={'колекції'} />
                    {/* Product Sort */}
                    <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-xs px-2'>
                        <option value='relevant'>Сортувати за релевантністю</option>
                        <option value='low-high'>Ціна (за зростанням)</option>
                        <option value='high-low'>Ціна (за спаданням)</option>
                    </select>
                </div>
                {/* Map Products */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {currentProducts.map((item, index) => (
                        <ProductItem key={index} name={item.name} id={item._id} price={item.price} salePrice={item.salePrice} image={item.image} />
                    ))}
                </div>
                {/* Pagination */}
                <div className='flex justify-center mt-8'>
                    {paginationItems}
                </div>
            </div>
        </div>
    );
};

export default Collection;
