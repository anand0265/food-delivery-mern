const express=require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()



//app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// database connection
connectDB()

//api end point
app.use('/api/food',require('./routes/foodRoute'))
app.use("/images",express.static('uploads'))
app.use('/api/user',require('./routes/userRoute'))
app.use('/api/cart',require('./routes/cartRoute'))
app.use('/api/order',require('./routes/orderRoute'))

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})