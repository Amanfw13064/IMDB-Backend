const mongoose=require('mongoose')

const producerSchema=mongoose.Schema({
    Name:{type:String,required:true},
    Gender:{type:String,required:true},
    DOB:{type:String,required:true},
    Bio:{type:String,required:true},
    Movies:[{type:mongoose.Schema.Types.ObjectId,ref:('movie')}]
},{
    timestamps:true,
    versionKey:false
})
module.exports=mongoose.model('producer',producerSchema)