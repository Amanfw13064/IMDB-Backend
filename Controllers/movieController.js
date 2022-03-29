const {Router}=require('express')

const router=Router()

const Movie=require('../Models/movieModel')

const {newToken}=require('./actorController')

const authenticate=require('../Middleware/authentication')

router.post("",async(req,res)=>{
    try{
        let movie=await Movie.findOne({Name:req.body.Name}).lean().exec()
        if(movie){
            return res.status(400).send({message:"Movie With that Name already Exists"})
        }
        movie=await Movie.create(req.body)
      let token=newToken(movie)
      return res.status(201).send({movie,token})
    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.get('',async(req,res)=>{
    try{
        const movie=await Movie.find().populate("Actors").populate('producer').lean().exec()
  
        return res.status(200).send(movie)
    }catch(err){
        return res.status(500).send(err.message)
    }
  })

  router.patch('/:id',authenticate,async(req,res)=>{
      try{
        let movie=await Movie.findByIdAndUpdate(req.params.id,{
            $push:{Actors:req.body.Actors}
        },{new:true}).populate("Actors").populate('producer').lean().exec()
        return res.send(movie)
      }catch(err){
        return res.status(500).send(err.message) 
      }
  })

 
  router.delete('/:id',authenticate,async(req,res)=>{
    try{
      let movie=await Movie.findByIdAndDelete(req.params.id).lean().exec()
      return res.send(movie)
    }catch(err){
      return res.status(500).send(err.message) 
    }
})

module.exports=router