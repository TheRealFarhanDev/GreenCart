import Address from "../models/Address.model.js";

//Add Address => /api/address/add
export const addAddress = async (req, res) => {
    try {
        const { userId, address } = req.body;
        await Address.create({ ...address, userId });
        res.status(200).json({
            success: true,
            message: "Address Added Successfully",
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Get Addresses of a user -> /api/address/list
export const getAddresses = async (req, res) => {
    try {
        const { userId } = req.body;
        const addresses = await Address.find({ userId });
        res.status(200).json({
            success: true,
            message: "Addresses Fetched Successfully",
            addresses
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}