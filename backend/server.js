import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';

connectDB();

const app = express();

app.use("/api/user", userRouter);

app.listen(port, () => {
    console.log(`Server runs on port : ${port}`);
});

//AMv8XDBcLR4acVav

