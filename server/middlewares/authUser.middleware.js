import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized - no token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized - invalid token",
      });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({
      success: false,
      message: "Not Authorized - token verification failed",
    });
  }
};

export default authUser;