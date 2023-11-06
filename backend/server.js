import express from 'express';
import colors from 'colors';
import dotenv, { config } from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.listen(port, () => {
    console.log(`Server runs on port : ${port}`);
});

