const mongoose=require('mongoose')


const serviceSchema=new mongoose.Schema({
    servicename:{
        type:String,
    },
    serviceprice:{
        type:Number,
    }
},{timestamps:true})


module.exports=mongoose.model('service' ,serviceSchema )