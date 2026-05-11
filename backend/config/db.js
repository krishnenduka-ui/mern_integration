import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const connectDB = () =>{
    mongoose.connect(process.env.MONGO_URI).then(() =>{
        console.log(`Connected to database`)

    })
}

export default connectDB