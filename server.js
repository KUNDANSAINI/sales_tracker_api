const express=require('express')
const app=express()

const cors=require('cors')

require('dotenv').config()
const authRouter=require('./routers/auth')
const serviceRouter=require('./routers/admin/service')
const taskRouter=require('./routers/admin/task')
app.use(cors())
app.use(express.json())

const mongoose=require('mongoose')

mongoose.connect(process.env.MONGOOSE_URL).then(()=>{console.log("Connected To DB!")}).catch((error)=>{
    console.log(error.message)
})





const morgan=require('morgan')


app.use(morgan('dev'))




app.use('/admin',serviceRouter)
app.use('/Task',taskRouter)
app.use('/auth',authRouter)

app.listen(process.env.PORT,()=>{console.log(`Server Is Running On Port ${process.env.PORT}`)})