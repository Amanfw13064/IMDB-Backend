const jwt=require('jsonwebtoken')

require('dotenv').config()

const verifyToken=(token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if(err) reject(err)
            resolve(decoded)
        })
    })
}

module.exports= async(req,res,next)=>{
        if(!req.headers.authorization){
            return res.status(400).send("Bad Request")
        }
        let BearerToken=req.headers.authorization
        if(!BearerToken.startsWith('Bearer')){
            return res.status(400).send("Bad Request")
        }
        let token=BearerToken.split(" ")[1]
        // let tok
        try{
           await verifyToken(token)    
        }catch(err){
            return res.status(400).send("Token is not valid")
        }
        next()
    }
