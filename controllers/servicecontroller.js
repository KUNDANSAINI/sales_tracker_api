const serviceTable=require('../models/service')
const mongoose=require('mongoose')

exports.addservice=(req,res)=>{
    try{
    const {servicename,serviceprice}=req.body
    const servicedata=new serviceTable({servicename,serviceprice})
    //console.log(servicedata)
    servicedata.save()
    res.status(200).json({
        status:200,
    })
    }catch(error){
        res.status(500).json({
            message:error.message,
            status:500
        })
    }
}

exports.service=async(req,res)=>{
    try{
    const alldata=await serviceTable.find()
    //console.log(alldata)
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

exports.singleservice=async(req,res)=>{
    try{
    const id=req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid ID")
    }
    const idData=await serviceTable.find({_id:id})
    if(idData.length==0){
        throw new Error("Data Not Found")
    }

    const singledata=await serviceTable.findById(id)
    res.status(200).json({
        singledata,
        status:200
    })
    }catch(error){
        res.status(500).json({
            message:error.message,
            status:500
        })
    }
}

exports.singleupdateservice=async(req,res)=>{
    try{
    const id=req.params.id
    const {servicename,serviceprice}=req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error('Invalid ID')
    }

    const idData=await serviceTable.find({_id:id})
    if(idData.length==0){
        throw new Error("Data Not Found")
    }

    await serviceTable.findByIdAndUpdate(id,{servicename,serviceprice})
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

exports.servicedelete=async(req,res)=>{
    try{
    const id=req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid ID")
    }
    const servicedata=await serviceTable.find({_id:id})
    if(servicedata.length==0){
        throw new Error("Data Not Found")
    }

    await serviceTable.findByIdAndDelete(id)

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