import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connecred: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;