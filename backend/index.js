import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

//Importing All the API routes
import authRoute from './Routes/auth.js'
import userRoute from './Routes/user.js'
import doctorRoute from './Routes/doctor.js'
import reviewRoute from './Routes/review.js'
import bookingRouter from './Routes/booking.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

const corsOptions = {
    origin : true
}

//Basic Route
app.get('/', (req, res) => {
    res.send("Api is Working")
})

//database connection
mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DATABASE Connected...")
    } catch (error) {
        console.log("DATABASE Connection Failed...")
    }
}

//MiddleWares
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api/v1/auth', authRoute) // localhost:3000/api/v1/auth/
app.use('/api/v1/users', userRoute) // localhost:3000/api/v1/users/
app.use('/api/v1/doctors', doctorRoute) // localhost:3000/api/v1/doctors/
app.use('/api/v1/reviews', reviewRoute) // localhost:3000/api/v1/reviews/
app.use('/api/v1/bookings', bookingRouter) // localhost:3000/api/v1/bookings/

//Listening To Server
app.listen(port, () => {
    connectDB()
    console.log("Server is Running at" +  "https://medimate-qdye.onrender.com/")
})