import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from "../assets/assets.js";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateProduct = async (id) => {
    try {
      window.location.href = `/update/${id}`;
    } catch (error) {
      console.log(error);
      toast.error("Can't find a product");
    }
  };

  // Filter and paginate the list
  const filteredList = list.filter(item =>
      item._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedList = filteredList.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  useEffect(() => {
    fetchList();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
      <>
        <p className='mb-2 dark:text-white'>Список усіх товарів</p>

        <div className='border-t border-b bg-gray-50 text-center dark:bg-black'>
          <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 dark:border-white dark:bg-white'>
            <input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to the first page on search
                }}
                className='flex-1 outline-none border-none text-sm dark:text-black'
                type="text"
                placeholder='Пошук за артикулом'
            />
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <div className='hidden md:grid grid-cols-[1fr_1fr_2fr_1.5fr_1fr_1fr_1fr] items-center py-1 px-2 border text-sm dark:text-white'>
            <b>Зображення</b>
            <b>Назва товару</b>
            <b>Артикул товару</b>
            <b>Категорія</b>
            <b>Ціна</b>
            <b className='text-center'>Змінити</b>
            <b className='text-center'>Видалити</b>
          </div>

          {paginatedList.map((item, index) => (
              <div
                  className='grid grid-cols-[20%_80%] md:grid-cols-[1fr_1fr_2fr_1.5fr_1fr_1fr_1fr] items-center py-1 px-2 border text-sm dark:text-white gap-2'
                  key={index}>
                <img className='w-12' src={item.image[0]} alt="" />
                <div className='col-span-1 md:col-span-1'>
                  <p>{item.name}</p>
                  <p className='text-xs md:hidden'>{item._id}</p>
                </div>
                <p className='hidden md:block'>{item._id}</p>
                <p className='hidden md:block'>{item.category}</p>
                <p className='hidden md:block'>{currency}{item.price}</p>
                <img onClick={() => updateProduct(item._id)} className='cursor-pointer w-7 h-7 mx-auto dark:invert dark:bg-white' src={assets.change} alt="" />
                <img onClick={() => removeProduct(item._id)} className='cursor-pointer w-7 h-7 mx-auto dark:invert dark:bg-white' src={assets.delete_product} alt="" />
              </div>
          ))}

          <div className='flex justify-center items-center mt-4'>
            <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className='px-3 py-1 mx-1 bg-gray-200 rounded dark:bg-white dark:text-black disabled:opacity-50'>
              Попередня
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 mx-1 rounded ${
                        currentPage === i + 1 ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-white dark:text-black'
                    }`}>
                  {i + 1}
                </button>
            ))}
            <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className='px-3 py-1 mx-1 bg-gray-200 rounded dark:bg-white dark:text-black disabled:opacity-50'>
              Наступна
            </button>
          </div>
        </div>
      </>
  );
};

export default List;
