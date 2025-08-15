import express from 'express'
import { addAddress, getAddresses } from '../controllers/address.controller.js';
import authUser from '../middlewares/authUser.middleware.js';

const addressRouter = express.Router();

addressRouter.post('/add', authUser, addAddress);
addressRouter.get('/list', authUser, getAddresses);

export default addressRouter;