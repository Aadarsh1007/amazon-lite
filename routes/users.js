const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/amazonn')
var passportLocalMMongoose=require('passport-local-mongoose');


var userSchema=mongoose.Schema({
  name:String,
  username:String,
  password:String,
  postid:[{
    type:mongoose.Schema.Types.ObjectId,ref:'post'
  }]
})
userSchema.plugin(passportLocalMMongoose)
module.exports =mongoose.model('user',userSchema)