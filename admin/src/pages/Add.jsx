import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)
    const [image5, setImage5] = useState(false)

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Чоловічий одяг");
    const [subCategory, setSubCategory] = useState("Светри та худі");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData()

            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("bestseller", bestseller)
            formData.append("sizes", JSON.stringify(sizes))

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)
            image5 && formData.append("image5", image5)

            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setImage5(false)
                setPrice('')
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 dark:text-white'>
            <div>
                <p className='md-2'>Завантажити зображення</p>

                <div className='flex gap-2 mt-4'>
                    <label htmlFor='image1'>
                        <img className='w-20 dark:invert dark:bg-white' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt='' />
                        <input onChange={(e) => setImage1(e.target.files[0])} type='file' id='image1' hidden />
                    </label>
                    <label htmlFor='image2'>
                        <img className='w-20 dark:invert dark:bg-white' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt='' />
                        <input onChange={(e) => setImage2(e.target.files[0])} type='file' id='image2' hidden />
                    </label>
                    <label htmlFor='image3'>
                        <img className='w-20 dark:invert dark:bg-white' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt='' />
                        <input onChange={(e) => setImage3(e.target.files[0])} type='file' id='image3' hidden />
                    </label>
                    <label htmlFor='image4'>
                        <img className='w-20 dark:invert dark:bg-white' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt='' />
                        <input onChange={(e) => setImage4(e.target.files[0])} type='file' id='image4' hidden />
                    </label>
                    <label htmlFor='image5'>
                        <img className='w-20 dark:invert dark:bg-white' src={!image5 ? assets.upload_area : URL.createObjectURL(image5)} alt='' />
                        <input onChange={(e) => setImage5(e.target.files[0])} type='file' id='image5' hidden />
                    </label>
                </div>
            </div>

            <div className='w-full'>
                <p className='md-2 dark:text-white'>Назва товару</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 dark:text-black' type='text' placeholder='Введіть назву товару' required />
            </div>

            <div className='w-full'>
                <p className='md-2 dark:text-white'>Опис товару</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 dark:text-black' type='text' placeholder='Введіть опис товару' required />
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8 dark:text-black'>
                <div>
                    <p className='mb-2 dark:text-white'>Категорія</p>
                    <select onChange={(e) => setCategory(e.target.value)} className='w-ful px-3 py-2'>
                        <option value="Чоловічий одяг">Чоловічий одяг</option>
                        <option value="Жіночий одяг">Жіночий одяг</option>
                        <option value="Дитячий одяг">Дитячий одяг</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2 dark:text-white'>Підкатегорія</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} className='w-ful px-3 py-2'>
                        <option value="Светри та худі">Светри та худі</option>
                        <option value="Футболки та реглани">Футболки та реглани</option>
                        <option value="Брюки та джинси">Брюки та джинси</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2 dark:text-white'>Ціна</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-1.5 sm:w-[120px]' type="number" placeholder='100' />
                </div>
            </div>

            <div>
                <p className='mb-2'>Розміри</p>
                <div className='flex gap-3 dark:text-black'>
                    <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
                        <p className={`${sizes.includes("S") ? "bg-red-500" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded`}>S</p>
                    </div>

                    <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
                        <p className={`${sizes.includes("M") ? "bg-red-500" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded`}>M</p>
                    </div>

                    <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
                        <p className={`${sizes.includes("L") ? "bg-red-500" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded`}>L</p>
                    </div>

                    <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
                        <p className={`${sizes.includes("XL") ? "bg-red-500" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded`}>XL</p>
                    </div>

                    <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
                        <p className={`${sizes.includes("XXL") ? "bg-red-500" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded`}>XXL</p>
                    </div>
                </div>
            </div>

            <div className='flex gap-2 mt-2'>
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
                <label className='cursor-pointer' htmlFor="bestseller">Додати до бестселерів</label>
            </div>

            <button type="submit" className='w-48 py-2 mt-4 bg-black text-white rounded dark:text-black dark:bg-white'>Додати</button>
        </form>
    )
}

export default Add