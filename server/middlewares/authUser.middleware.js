import jwt from "jsonwebtoken";


const authUser = async (req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return res.json({
            success:false,
            message: "Not Authorized - no token",
            status: 401,
        })
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode){
            req.userId = tokenDecode.id;
        } else {
            return res.json({
                success:false,
                message: "Not Authorized - invalid token",
                status: 401,
            })
        }
        next();
    } catch (error) {
        console.log(error.message);
        res.json({
            success:false,
            message: error.message
        })
    }
}

export default authUser;