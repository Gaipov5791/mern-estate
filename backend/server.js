import express, { urlencoded } from 'express';
import cors from 'cors';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
    console.log(`Server runs on port : ${port}`);
});

//AMv8XDBcLR4acVav

