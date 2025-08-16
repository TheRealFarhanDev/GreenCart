//Place Order COD -> /api/order/cod

import Product from "../models/Product.model.js";
import Order from "../models/Order.model.js";
import stripe from "stripe";
import User from "../models/User.model.js";

//place order using cod -> /api/order/cod
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

//place order using stipe -> /api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        const { origin } = req.headers;

        if (!address || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Address and Items are required",
            })
        }

        let productData = [];

        //Calculate amount using item
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            });
            return acc + product.price * item.quantity;
        }, 0);

        //Add tax Charge 2%
        amount += Math.floor(amount * 0.02);

        //Create Order
        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
        });

        //Stripe Gateway Initialize
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        //create line item for stripe
        const line_items = productData.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
                },
                quantity: item.quantity,
            }
        }
        )

        //create session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            }
        })

        res.status(200).json({
            success: true,
            url: session.url,
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

//Stripe webhooks to verify payment actions : /stripe
export const webhooks = async (req, res) => {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        res.status(400).send(`Webhook Error: ${error.message}`);
    }

    //Handle Event
    switch (event.type) {
        case "payment_intent.succeeded":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //getting metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });
            const orderId = session.data[0].metadata.orderId;
            const userId = session.data[0].metadata.userId;

            //mark payment as paid
            await Order.findByIdAndUpdate(orderId, {
                isPaid: true,
            })
            //Clear the cart item
            await User.findOneAndUpdate(userId, {
                cartItems: {},
            })
            break;
        }
        case 'payment_intent.payment_failed':{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //getting metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });
            const orderId = session.data[0].metadata.orderId;
            await Order.findByIdAndDelete(orderId);
            break;
        }
    
        default:
            console.error(`Unhandled event type: ${event.type}`);
            break;
    }
    res.json({ received: true });
}


// Get Orders by User Id -> /api/order/user

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            userId: req.userId,
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