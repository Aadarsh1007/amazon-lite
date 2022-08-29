const mongoose=require('mongoose');

var productSchema=mongoose.Schema({
  name:String,
  description:String,
  price:String,
  photo:String,
  userid:{
    type:mongoose.Schema.Types.ObjectId,ref:'user'
  }
})

module.exports=mongoose.model('post',productSchema)