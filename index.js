require("dotenv").config();
const Express=require('express')

const app = Express()
require('./config/modelConfig')

let userRouter = require('./routes/userRoutes');
const router = require("./routes/userRoutes");

app.use(Express.json())
app.use('/',userRouter)

app.listen(process.env.PORT,(req,res)=>{
    console.log(`port is running on:${process.env.PORT}`)
})