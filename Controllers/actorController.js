const {Router}=require('express')

require('dotenv').config()

const jwt = require('jsonwebtoken')

const router=Router()

const Actor=require('../Models/actorModel')

const authenticate=require('../Middleware/authentication')

const newToken=(token)=>{

    return jwt.sign({token:token},process.env.JWT_SECRET_KEY)
}

router.post('',async(req,res)=>{
    try{
        let actor=await Actor.findOne({Name:req.body.Name}).lean().exec()
        if(actor){
            return res.status(400).send({message:"Actor with that name already exists"})
        }
        actor=await Actor.create(req.body)

        let token=newToken(actor)

        return res.status(201).send({actor,token})

    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.get('',async(req,res)=>{
  try{
      const actor=await Actor.find().populate('Movies').lean().exec()

      return res.status(200).send(actor)
  }catch(err){
      return res.status(500).send(err.message)
  }
})


router.patch('/:id',authenticate,async(req,res)=>{
    try{
        const actor=await Actor.findByIdAndUpdate(req.params.id,{
            $push:{Movies:req.body.Movies}
        },{new:true}).populate('Movies').lean().exec()
        
        return res.status(200).send(actor)
    }catch(err){
        return res.status(500).send(err.message)
    }
  })

  router.delete('/:id',authenticate,async(req,res)=>{
    try{
      let actor=await Actor.findByIdAndDelete(req.params.id).lean().exec()
      return res.send(actor)
    }catch(err){
      return res.status(500).send(err.message) 
    }
})


module.exports={router,newToken}