const mongoose=require('mongoose')


const taskSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    mobile:{
        type:Number,
    },
    decs:{
        type:String,
    },
    service:{
        type:String
    },
    price:{
        type:Number
    },
    addcharge:{
        type:Number
    },
    addDecs:{
        type:String,
    }
},{timestamps:true})


module.exports=mongoose.model('task' ,taskSchema )