import express, { urlencoded } from 'express';
import cors from 'cors';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 5000;
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import listingRouter from './routes/listingRoutes.js';

connectDB();

const app = express();

app.use(cors());

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

//middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});

app.listen(port, () => {
    console.log(`Server runs on port : ${port}`);
});

//AMv8XDBcLR4acVav

