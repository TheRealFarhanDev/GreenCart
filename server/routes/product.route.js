import express from "express"
import { addProduct, changeStock, getProducts, productById } from "../controllers/product.controller.js";
import authSeller from "../middlewares/AuthSeller.middleware.js";
import { upload } from "../config/multer.js";

const productRouter = express.Router();

productRouter.post('/add', upload.array('images'), authSeller, addProduct);
productRouter.get('/list', getProducts);
productRouter.get('/id', productById);
productRouter.post('/stock', authSeller, changeStock);


export default productRouter;