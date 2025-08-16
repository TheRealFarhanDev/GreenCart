import jwt from "jsonwebtoken";

const authSeller = (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized - No token",
    });
  }

  try {
    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (tokenDecode.email === process.env.SELLER_EMAIL) {
      return next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not Authorized - invalid token",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export default authSeller;