const mongoose=require('mongoose')


const registerSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
    },
    mobile:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        default:"User"
    },
    totalearn:{
        type:Number,
        default:0
    }
},{timestamps:true})


module.exports=mongoose.model('register' ,registerSchema )