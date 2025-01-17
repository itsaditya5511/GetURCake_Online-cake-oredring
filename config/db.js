import mongoose from "mongoose"
import colors from "colors"
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async() => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mdb ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(error);
        console.log("error in mdb again".bgRed.white)
    }

};

export default connectDB