const express=require('express')

const app=express()

const {router}=require('./Controllers/actorController')

const movieController=require('./Controllers/movieController')

const producerController=require('./Controllers/producerController')

app.use(express.json())

app.use('/actor',router)

app.use('/movie',movieController)

app.use('/producer',producerController)

module.exports=app