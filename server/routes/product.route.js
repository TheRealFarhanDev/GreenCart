import express from "express"
import { addProduct, changeStock, getProducts, productById } from "../controllers/product.controller.js";
import authSeller from "../middlewares/authSeller.middleware.js";
import { upload } from "../config/multer.js";

const productRouter = express.Router();

productRouter.post('/add', authSeller, upload.array('images'), addProduct);
productRouter.get('/list', getProducts);
productRouter.get('/id', productById);
productRouter.post('/stock', authSeller, changeStock);


export default productRouter;