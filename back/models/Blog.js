const mongoose = require("mongoose");
const blogSchema = mongoose.Schema({
  user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
  },
  title:{
      type:String
  },
  description:{
      type:String
  },
  image:{
      type:String,
      default:""
  }, 
},
{timestamps:true}
)

module.exports = mongoose.model('Blog' , blogSchema)