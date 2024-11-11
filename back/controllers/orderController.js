import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {

    try {

        const { userID, items, amount, address } = req.body;

        const orderData = {
            userID,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userID, { cartData: {} })

        res.json({ success: true, message: "Order placed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

const placeOrderStripe = async (req, res) => {

}

const placeOrderRazorpay = async (req, res) => {

}

const allOrders = async (req, res) => {
    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const userOrders = async (req, res) => {

}

const updateStatus = async (req, res) => {

}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus }