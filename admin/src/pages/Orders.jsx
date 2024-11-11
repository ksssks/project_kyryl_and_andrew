import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets.js'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }

    try {

      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }

  const statusHandler = async (event, orderId) => {
    try {

      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders()
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div>
      <h3>Замовлення</h3>
      <div>
        {
          orders.map((order, index) => (
            <div key={index}>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {order.items.map((item, index) => {
                    return <p key={index}> {item.name} x {item.quantity} <span> {item.size} </span></p>
                  })}
                </div>
                <p>{order.address.firstName + ' ' + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ','}</p>
                  <p>{order.address.country + ', ' + order.address.city + ' ' + order.address.state}</p>
                  <p>{order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p>Найменувань товарів: {order.items.length}</p>
                <p>Спосіб оплати: {order.paymentMethod}</p>
                <p>{order.payment ? 'Замовлення оплачено' : 'Очікуємо на оплату'}</p>
                <p>Дата замовлення: {new Date(order.date).toLocaleDateString('uk-UA', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}</p>
              </div>
              <p> {order.amount}{currency}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Замовлення оформлено">Замовлення оформлено</option>
                <option value="Пакування замовлення">Пакування замовлення</option>
                <option value="Готово до відправлення">Готово до відправлення</option>
                <option value="Замовлення відправлено">Замовлення відправлено</option>
                <option value="Замовлення доставлено">Замовлення доставлено</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders