const jwt=require('jsonwebtoken')
require('dotenv').config()

function tokenvalid(req,res,next){
    try{
    const Authorization=(req.headers.authorization)
    if(Authorization){
        const token=Authorization.split(' ')[1]
        if(token){
            jwt.verify(token,process.env.SECRET_KEY,(err,val)=>{
                if(err){
                        throw new Error("Invalid Token")
                }else{
                    next()
                }
            })
            //console.log(token)
        }else{
            throw new Error("Invalid Token")
        }
    }else{
        throw new Error("Invalid Token")
    }
}catch(error){
    res.status(400).json({
        message:error.message,
        status:400
    })
}
}



module.exports=tokenvalid