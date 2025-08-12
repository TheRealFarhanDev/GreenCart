import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.model.js";


//Add Product -> /api/product/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);

        const images = req.files;

        let imgUrl = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, {resource_type: "image"});
                return result.secure_url
            })
        )

        await Product.create({...productData, images: imgUrl})

        res.json({
            success: true,
            message: "Product Added Successfully",
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}

//Get products -> /api/product/list
export const getProducts = async (req, res) => {

}

//Get a Single Product -> /api/product/:id
export const productById = async (req, res) => {

}

//Change Product isStock -> /api/product/stock
export const changeStoke = async (req, res) => {

}