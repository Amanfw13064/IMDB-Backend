const {Router}=require('express')

const router=Router()

const Producer=require('../Models/producerModel')

const {newToken} =require('./actorController')

const authenticate=require('../Middleware/authentication')

router.post("",async(req,res)=>{
    try{
        let producer=await Producer.findOne({Name:req.body.Name}).lean().exec()
        if(producer){
            return res.status(400).send({message:"Producer With that Name already Exists"})
        }
        producer=await Producer.create(req.body)
      let token=newToken(producer)
      return res.status(201).send({producer,token})
    }catch(err){
        return res.status(500).send(err.message)
    }
})
router.get('',async(req,res)=>{
    try{
        const producer=await Producer.find().populate('Movies').lean().exec()
  
        return res.status(200).send(producer)
    }catch(err){
        return res.status(500).send(err.message)
    }
  })

  router.patch('/:id',authenticate,async(req,res)=>{
      try{
        let producer=await Producer.findByIdAndUpdate(req.params.id,{
            $push:{Movies:req.body.Movies}
        },{new:true}).populate('Movies').lean().exec()
        return res.send(producer)
      }catch(err){
        return res.status(500).send(err.message) 
      }
  })
  router.delete('/:id',authenticate,async(req,res)=>{
    try{
      let producer=await Producer.findByIdAndDelete(req.params.id).lean().exec()
      return res.send(producer)
    }catch(err){
      return res.status(500).send(err.message) 
    }
})


module.exports=router