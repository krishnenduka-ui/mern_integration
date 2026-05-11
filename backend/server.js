import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import connectDB from './config/db.js'
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);
import authRouter from './routes/userRoutes.js'
import customerRoutes from './routes/customerRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'


const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth',authRouter)


app.use("/customers", customerRoutes)

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})

connectDB()

