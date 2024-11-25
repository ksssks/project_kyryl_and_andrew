import React, {useState, useEffect} from 'react'
import { useParams, useNavigate  } from 'react-router-dom';
import {assets} from '../assets/assets'
import axios from 'axios'
import {backendUrl} from '../App'
import {toast} from 'react-toastify'

const Update = ({token}) => {
    const navigate = useNavigate();
    const { id: productId } = useParams();

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)
    const [image5, setImage5] = useState(false)

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [sale, setSale] = useState(false);
    const [salePrice, setSalePrice] = useState("");
    const [category, setCategory] = useState("Чоловічий одяг");
    const [subCategory, setSubCategory] = useState("Светри та худі");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [number, setNumber] = useState([0, 0, 0, 0, 0]);
    const allSizes = ["S", "M", "L", "XL", "XXL"];

    const fetchProductData = async () => {
        try {
            
            const response = await axios.post(backendUrl + '/api/product/single', {productID: productId });

            if (response.data.success) {
                const product = response.data.product;
                
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setSale(product.sale);
                setSalePrice(product.salePrice);
                setCategory(product.category);
                setSubCategory(product.subCategory);
                setBestseller(product.bestseller);

                const sizeData = allSizes.map(size => product.sizes.includes(size) ? size : null).filter(Boolean);
                setSizes(sizeData);

                const numberData = allSizes.map(size => {
                    const index = product.sizes.indexOf(size);
                    return index !== -1 ? product.number[index] : 0;
                });
                setNumber(numberData);

                const images = product.image
                const files = await Promise.all(images.map((url) => convertUrlToFile(url)));

                setImage1(files[0] || false);
                setImage2(files[1] || false);
                setImage3(files[2] || false);
                setImage4(files[3] || false);
                setImage5(files[4] || false);
              } else {
                toast.error(response.data.message);
              }

        } catch (error) {
            console.log(error);
            toast.error('Не вдалося завантажити дані продукту');
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData()

            formData.append("id", productId);
            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("sale", sale)
            formData.append("salePrice", salePrice)

            if (salePrice !== "") {
                const saleModify = Math.ceil(Math.round((1 - Number(salePrice) / Number(price)) * 10000) / 100);
                formData.append("saleModify", `-${saleModify}%`);
            } else {
                formData.append("saleModify", "");
            }


            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("bestseller", bestseller)
            formData.append("sizes", JSON.stringify(sizes))
            const filteredNumbers = sizes.map((size) => {
                const index = allSizes.indexOf(size);
                return number[index];
            });
            formData.append("number", JSON.stringify(filteredNumbers));

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)
            image5 && formData.append("image5", image5)

            const response = await axios.post(backendUrl + "/api/product/update", formData, {headers: {token}});

            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/list');
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const handleCancelChanges = () => {
        navigate('/list');
    };
    
    const convertUrlToFile = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const fileName = url.split('/').pop(); 
            return new File([blob], fileName, { type: blob.type });
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const toggleSize = (size) => {
        setSizes((prev) => {
            const updatedSizes = prev.includes(size)
                ? prev.filter((item) => item !== size)
                : [...prev, size];
            return allSizes.filter((item) => updatedSizes.includes(item));
        });
    };

    const updateNumber = (value, index) => {
        const newNumber = [...number];
        newNumber[index] = value;
        setNumber(newNumber);
    };

    useEffect(() => {
        fetchProductData();
    }, [productId, token]);

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 dark:text-white'>
            <div>
                <p className='md-2'>Завантажити зображення</p>

                <div className='flex gap-2 mt-4'>
                    <label htmlFor='image1'>
                        <img className='w-20 dark:bg-white'
                             src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt=''/>
                        <input onChange={(e) => setImage1(e.target.files[0])} type='file' id='image1' hidden/>
                    </label>
                    <label htmlFor='image2'>
                        <img className='w-20'
                             src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt=''/>
                        <input onChange={(e) => setImage2(e.target.files[0])} type='file' id='image2' hidden/>
                    </label>
                    <label htmlFor='image3'>
                        <img className='w-20 '
                             src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt=''/>
                        <input onChange={(e) => setImage3(e.target.files[0])} type='file' id='image3' hidden/>
                    </label>
                    <label htmlFor='image4'>
                        <img className='w-20 '
                             src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt=''/>
                        <input onChange={(e) => setImage4(e.target.files[0])} type='file' id='image4' hidden/>
                    </label>
                    <label htmlFor='image5'>
                        <img className='w-20 '
                             src={!image5 ? assets.upload_area : URL.createObjectURL(image5)} alt=''/>
                        <input onChange={(e) => setImage5(e.target.files[0])} type='file' id='image5' hidden/>
                    </label>
                </div>
            </div>

            <div className='w-full'>
                <p className='md-2 dark:text-white'>Назва товару</p>
                <input onChange={(e) => setName(e.target.value)} value={name}
                       className='w-full max-w-[500px] px-3 py-2 dark:text-black' type='text'
                       placeholder='Введіть назву товару' required/>
            </div>

            <div className='w-full'>
                <p className='md-2 dark:text-white'>Опис товару</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description}
                          className='w-full max-w-[500px] px-3 py-2 dark:text-black' type='text'
                          placeholder='Введіть опис товару' required/>
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8 dark:text-black'>
                <div>
                    <p className='mb-2 dark:text-white'>Категорія</p>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-ful px-3 py-2'>
                        <option value="Чоловічий одяг">Чоловічий одяг</option>
                        <option value="Жіночий одяг">Жіночий одяг</option>
                        <option value="Дитячий одяг">Дитячий одяг</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2 dark:text-white'>Підкатегорія</p>
                    <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className='w-ful px-3 py-2'>
                        <option value="Светри та худі">Светри та худі</option>
                        <option value="Футболки та реглани">Футболки та реглани</option>
                        <option value="Брюки та джинси">Брюки та джинси</option>
                    </select>
                </div>
            </div>

            <div className='flex gap-2 mt-2'>
                <input onChange={() => setSale(prev => !prev)} checked={sale} type="checkbox" id="sale"/>
                <label className='cursor-pointer' htmlFor="sale">Додати знижку</label>
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8 dark:text-black'>
                <div>
                    <p className='mb-2 dark:text-white'>Ціна</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price}
                           className='w-full px-3 py-1.5 sm:w-[120px]' type="number" placeholder='100' required/>
                </div>

                <div>
                    <p className='mb-2 dark:text-white'>Ціна зі знижкою</p>
                    <input onChange={(e) => setSalePrice(e.target.value)} value={salePrice} disabled={!sale}
                           className='w-full px-3 py-1.5 sm:w-[120px]' type="number" placeholder='100'/>
                </div>
            </div>

            <div>
                <p className='mb-2'>Розміри</p>
                <div className='flex gap-3 dark:text-black'>
                    <div onClick={() => toggleSize("S")} className="w-10 text-xs sm:text-lg sm:w-16 text-center">
                        <p className={`${sizes.includes("S") ? "bg-red-500" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded`}>S</p>
                    </div>

                    <div onClick={() => toggleSize("M")} className="w-10 text-xs sm:text-lg sm:w-16 text-center">
                        <p className={`${sizes.includes("M") ? "bg-red-500" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded`}>M</p>
                    </div>

                    <div onClick={() => toggleSize("L")} className="w-10 text-xs sm:text-lg sm:w-16 text-center">
                        <p className={`${sizes.includes("L") ? "bg-red-500" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded`}>L</p>
                    </div>

                    <div onClick={() => toggleSize("XL")} className="w-10 text-xs sm:text-lg sm:w-16 text-center">
                        <p className={`${sizes.includes("XL") ? "bg-red-500" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded`}>XL</p>
                    </div>

                    <div onClick={() => toggleSize("XXL")} className="w-12 text-xs sm:text-lg sm:w-16 text-center">
                        <p className={`${sizes.includes("XXL") ? "bg-red-500" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded`}>XXL</p>
                    </div>
                </div>
            </div>

            <div className='flex gap-3 dark:text-black'>
                <input value={number[0]} onChange={(e) => updateNumber(Number(e.target.value), 0)} disabled={!sizes.includes(allSizes[0])}
                       className='max-w-16 px-3 w-10 text-xs sm:text-lg py-1.5 sm:w-[120px]' type="number" placeholder='10'/>
                <input value={number[1]} onChange={(e) => updateNumber(Number(e.target.value), 1)} disabled={!sizes.includes(allSizes[1])}
                       className='max-w-16 px-3 w-10 text-xs sm:text-lg py-1.5 sm:w-[120px] ' type="number" placeholder='10'/>
                <input value={number[2]} onChange={(e) => updateNumber(Number(e.target.value), 2)} disabled={!sizes.includes(allSizes[2])}
                       className='max-w-16 px-3 w-10 text-xs sm:text-lg py-1.5 sm:w-[120px]' type="number" placeholder='10'/>
                <input value={number[3]} onChange={(e) => updateNumber(Number(e.target.value), 3)} disabled={!sizes.includes(allSizes[3])}
                       className='max-w-16 px-3 w-10 text-xs sm:text-lg py-1.5 sm:w-[120px]' type="number" placeholder='10'/>
                <input value={number[4]} onChange={(e) => updateNumber(Number(e.target.value), 4)} disabled={!sizes.includes(allSizes[4])}
                       className='max-w-16 px-3 w-12 text-xs sm:text-lg py-1.5 sm:w-[120px]' type="number" placeholder='10'/>
            </div>

            <div className='flex gap-2 mt-2'>
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox"
                       id="bestseller"/>
                <label className='cursor-pointer' htmlFor="bestseller">Додати до бестселерів</label>
            </div>
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8 dark:text-black'>
                <button type="submit"
                        className='w-48 py-2 mt-4 bg-black text-white rounded dark:text-black dark:bg-white'>Застосувати
                </button>
                <button type="button" onClick={handleCancelChanges} className='w-48 py-2 mt-4 bg-red-500 text-white rounded dark:text-black'>Скасувати
                    зміни
                </button>
            </div>
        </form>
    )
}

export default Update