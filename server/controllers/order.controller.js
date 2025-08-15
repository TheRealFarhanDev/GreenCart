//Place Order COD -> /api/order/cod

import Product from "../models/Product.model.js";
import Order from "../models/Order.model.js";

export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        if (!address || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Address and Items are required",
            })
        }
        //Calculate amount using item
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return acc + product.price * item.quantity;
        }, 0);

        //Add tax Charge 2%
        amount += Math.floor(amount * 0.02);

        //Create Order
        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
            isPaid: true,
        });
        res.status(200).json({
            success: true,
            message: "Order Placed Successfully",
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Get Orders by User Id -> /api/order/user

export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: 'COD' }, { isPaid: true }]
        }).populate('items.product address').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        })


    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Get All Orders for seller or admin -> /api/order/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: 'COD' }, { isPaid: true }]
        }).populate('items.product address').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}