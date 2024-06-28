const mongoose= require('mongoose')
const taskTable=require('../models/task')
const registerTable=require('../models/register')


exports.empolyeetask=async(req,res)=>{
    try{
    const email=req.params.email
    const {name,service,addcharge,mobile,price,decs,addDecs}=req.body
    //console.log(req.body)
    const totalEarn=(Number(price)+Number(addcharge))
    const emaildata=await registerTable.findOne({email})
    emaildata.totalearn=emaildata.totalearn + totalEarn
    await emaildata.save()
    //console.log(emaildata)
    const newRecord=new taskTable({name,service,addcharge,mobile,price,decs,addDecs})
    newRecord.save()
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

exports.alltaskdata=async(req,res)=>{
    try{
    const alldata=await taskTable.find()
    res.status(200).json({
        alldata,
        status:200
    })
}catch(error){
    res.status(500).json({
        message:error.message,
        status:500
    })
}
}

exports.taskdelete=async(req,res)=>{
    try{
    const id=req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid ID")
    }

    const idvalid=await taskTable.find({_id:id})
    if(idvalid.length==0){
        throw new Error("Data Not Found")
    }

    await taskTable.findByIdAndDelete(id)

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

exports.singletask=async(req,res)=>{
    try{
    const id=req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid ID")
    }

    const idvalid=await taskTable.find({_id:id})
    if(idvalid.length==0){
        throw new Error("Data Not Found")
    }

    const onedata=await taskTable.findById(id)
    //console.log(onedata)
    res.status(200).json({
        onedata,
        status:200
    })
}catch(error){
    res.status(500).json({
        message:error.message,
        status:500
    })
}
}

exports.updatetask=async(req,res)=>{
    try{
    const id=req.params.id
    const {service,addcharge}=req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid ID")
    }
    const idvalid=await taskTable.find({_id:id})
    if(idvalid.length==0){
        throw new Error("Invalid ID")
    }
    await taskTable.findByIdAndUpdate(id,{service,addcharge})

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

exports.userservice=async(req,res)=>{
    try{
    const email=req.params.email
    if(!email){
        throw new Error("Data Not Found")
    }
    const emaildata=await registerTable.findOne({email})
    const username=emaildata.name
    const userservice=await taskTable.find({name:username})
    //console.log(userservice)
    res.status(200).json({
        userservice,
        status:200
    })
}catch(error){
    res.status(500).json({
        message:error.message,
        status:500
    })
}
}