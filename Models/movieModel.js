const mongoose=require('mongoose')

const movieSchema=mongoose.Schema({
    Name:{type:String,required:true},
    Year:{type:String,required:true},
    Plot:{type:String,required:true},
    Post:{type:String,required:true},
    Actors:[{type:mongoose.Schema.Types.ObjectId,ref:('actor')}],
    producer:{type:mongoose.Schema.Types.ObjectId,ref:('producer'),required:true}

},{
    timestamps:true,
    versionKey:false
})

module.exports=mongoose.model('movie',movieSchema)