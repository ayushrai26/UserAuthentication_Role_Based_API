const express = require('express')
const app = express()
const cors  = require('cors')
const mongoose  = require('mongoose')
require('dotenv').config();
app.use(express.json())
const authRoutes  = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000
app.use(cors({
    origin:true,
    credentials:true
}))
app.use(cookieParser())

app.use('/api',authRoutes)
app.use('/user',userRoutes)
app.use('/admin',adminRoutes)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Database Connected')
}).catch((err)=>{
    console.log('Error connecting Database')
})

app.listen(PORT,()=>{
    console.log('Server is running ')
})