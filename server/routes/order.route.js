import express from "express";
import authUser from "../middlewares/authUser.middleware.js";
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.get('/user', authUser, getUserOrders)
orderRouter.get('/seller', authUser, getAllOrders)
orderRouter.post('/stripe', authUser, placeOrderStripe)

export default orderRouter;