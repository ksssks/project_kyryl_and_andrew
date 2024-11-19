import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import {assets} from "../assets/assets.js";

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {

      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
      <>
        <p className='mb-2 dark:text-white'>Список усіх товарів</p>
        <div className='flex flex-col gap-2'>

          <div className='hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border text-sm dark:text-white'>
            <b>Зображення</b>
            <b>Назва товару</b>
            <b>Артикул товару</b>
            <b>Категорія</b>
            <b>Ціна</b>
            <b className='text-center'>Змінити</b>
            <b className='text-center'>Видалити</b>
          </div>

          {
            list.map((item, index) => (
                <div
                    className='grid grid-cols-[1fr_1fr_1fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border text-sm dark:text-white'
                    key={index}>
                  <img className='w-12' src={item.image[0]} alt=""/>
                  <p>{item.name}</p>
                  <p>{item._id}</p>
                  <p>{item.category}</p>
                  <p>{currency}{item.price}</p>
                  <img className='cursor-pointer w-7 h-7 mx-auto dark:invert dark:bg-white' src={assets.change} alt=""/>
                  <img onClick={() => removeProduct(item._id)} className='cursor-pointer w-7 h-7 mx-auto dark:invert dark:bg-white' src={assets.delete_product} alt=""/>
                </div>
            ))
          }

        </div>

      </>
  )
}

export default List