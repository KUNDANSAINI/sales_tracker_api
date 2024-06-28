const authTable = require('../models/register')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose=require('mongoose')


exports.register = async (req, res) => {
    try {
        const { name, email, password, dob, mobile } = req.body
        const bpass = await bcrypt.hash(password, 10)
        //console.log(bpass)
        const registerdata = new authTable({ name, email, password: bpass, dob, mobile })
        //console.log(registerdata)
        registerdata.save()
        res.status(200).json({
            status: 200
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: 400
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userData = await authTable.findOne({ email })
        //console.log(userData)
        if (userData !== null) {
            const comparepass = await bcrypt.compare(password, userData.password)
            if (comparepass) {
                let payload = { email:userData.email }
                const token = jwt.sign(payload, process.env.SECRET_KEY)
                res.status(200).json({
                    token,
                    email,
                    role:userData.role,
                    status:200
                })
            } else {
                throw new Error("Invalid Pasword")
            }
        } else {
            throw new Error("Invalid Email ID")
        }
    } catch (error) {
        res.status(500).json({
            message:error.message,
            status:500
        })
    }
}

exports.empolyee=async(req,res)=>{
    try{
    const allempolyee=await authTable.find({role:"User"})
    //console.log(allempolyee)
    res.status(200).json({
        allempolyee,
        status:200
    })
    }catch(error){
        res.status(500).json({
            message:error.message,
            status:500
        })
    }
}

exports.empolyeedelete=async (req,res)=>{
    try{
    const id=req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid ID")
    }

    const oneempolyee=await authTable.find({_id:id})
    if(oneempolyee.length===0){
        throw new Error("Data Not Found")
    }

    await authTable.findByIdAndDelete(id)
    res.status(200).json({
        status:200
    })
}catch(error){
    res.status(500).json({
        message:error.message,
        status:500
    })
}
}

exports.singleuser=async(req,res)=>{
    try{
    const id=req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid ID")
    }

    const singledata=await authTable.find({_id:id})
    if(singledata.length===0){
        throw new Error("Invalid ID")
    }

    const singleuser=await authTable.findById(id)
    res.status(201).json({
        singleuser,
        status:201
    })
}catch(error){
    res.status(400).json({
        message:error.message,
        status:400
    })
}
}

exports.userupdate=async (req,res)=>{
    try{
    const id=req.params.id
    //console.log(req.body)
    const {name,email,password,mobile,dob}=req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid ID")
    }

    const oneuser= await authTable.find({_id:id})
    if(oneuser.length===0){
        throw new Error("Data Not Found")
    }
    const cpass=await bcrypt.hash(password,10)
    //console.log(cpass)
    await authTable.findByIdAndUpdate(id,{name,email,password:cpass,mobile,dob})
    res.status(201).json({
        status:201
    })
}catch(error){
    res.status(400).json({
        message:error.message,
        status:400
    })
}
}


exports.useremail=async(req,res)=>{
    try{
    const email=req.params.email
    if(!email){
        throw new Error("Data Not Found")
    }
    const singledata=await authTable.find({email:email})
    console.log(singledata.length)
    if(singledata.length===0){
        throw new Error("Data Not Found")
    }
    const singleuser=await authTable.findOne({email})
    res.status(201).json({
        singleuser,
        status:201
    })
}catch(error){
    res.status(400).json({
        message:error.message,
        status:400
    })
}
}