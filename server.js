import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoute from './routes/authRoutes.js'
import categoryRotes from "./routes/categoryRoutes.js"
import productRoute from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cors from 'cors'
dotenv.config()

//database config
connectDB();

const app = express()

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))



//routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category', categoryRotes)
app.use('/api/v1/product', productRoute)
app.use("/api/v1/users", userRoutes);




app.get('/', (req, res) => {

    res.send({
        message: "welcome !"
    })
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`server is running on : ${port}`.bgCyan.blue);
})