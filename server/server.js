const express=require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()



//app config
const app = express()
const port = 4000


const allowedOrigins = [
  'http://localhost:5173',
  'https://food-delivery-frontend-dnp6.onrender.com',
    'https://food-delivery-admin-v4of.onrender.com',  // ✅ frontend URL here (no trailing slash)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  credentials: true,
}));

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


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
