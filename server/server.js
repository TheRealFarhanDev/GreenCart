import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import sellerRouter from "./routes/seller.route.js";
import { connectCloudinary } from "./config/cloudinary.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();


//Allow Multiple Origins
const allowedOrigins = ["http://localhost:5173"];

//Middleware Configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.get("/", (req, res)=>{
    res.send("API is Working!");
})

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})